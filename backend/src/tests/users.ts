import request from "supertest";
import {getApp} from '../bootstrap/app';
import {Server} from "http";
import {getConnection} from "typeorm";

let server: Server;

beforeAll(async () => {
    // getting server ready
    const app = await getApp();
    server = app.listen(process.env.PORT);
});

afterAll(async () => {
    // shutting down the server
    console.log("Shutting the server");
    server.close();
});

beforeEach(async () =>{
    // cleaning up database
    const entities = getConnection().entityMetadatas;
    for (const entity of entities) {
        const repository = getConnection().getRepository(entity.name);
        await repository.clear();
    }
})

describe('Authentication and Users', () => {

    it('GET /users should not allow unauthorized access', async () => {
        const res = await request(server).get('/users');
        expect(res.status).toEqual(401);
        expect(res.body).not.toHaveProperty('users');
        console.log(res.body);
    });

    it("auth should return JWT and the user", async () => {
        const res = await request(server).post('/auth/register').send({
            fullName: "Test Name",
            email: "test@test.com",
            password: "1q2w3e4rDD#",
            passwordConfirmation: "1q2w3e4rDD#"
        });
        console.log(res.body);
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('user');
        expect(res.body).toHaveProperty('jwt');
    });

    it("Can't register 2 users with same email", async () => {
        const res = await request(server).post('/auth/register').send({
            fullName: "Test Name",
            email: "test@test.com",
            password: "1q2w3e4rDD#",
            passwordConfirmation: "1q2w3e4rDD#"
        });
        expect(res.status).toEqual(200);
        const res2 = await request(server).post('/auth/register').send({
            fullName: "Test Name",
            email: "test@test.com",
            password: "1q2w3e4rDD#",
            passwordConfirmation: "1q2w3e4rDD#"
        });
        expect(res2.status).not.toEqual(200);

    });

    it("Can't register with simple password", async () => {
        const res = await request(server).post('/auth/register').send({
            fullName: "Test Name",
            email: "test@test.com",
            password: "justastring#",
            passwordConfirmation: "justastring"
        });
        expect(res.status).not.toEqual(200);
    });

    it("Can login", async () => {
        const res = await request(server).post('/auth/register').send({
            fullName: "Test Name",
            email: "login@test.com",
            password: "1q2w3e4rDD!",
            passwordConfirmation: "1q2w3e4rDD!"
        });
        expect(res.status).toEqual(200);

        const res2 = await request(server).post('/auth/login').send({
            email: "login@test.com",
            password: "1q2w3e4rDD!",
        });
        expect(res2.type).toEqual(expect.stringContaining('json'));
        expect(res2.body).toHaveProperty('user');
        expect(res2.body).toHaveProperty('jwt');
        expect(res2.status).toEqual(200);

    });

    it("Can't login with the user that doesn't exist", async () => {

        const res2 = await request(server).post('/auth/login').send({
            email: "unknownemail@test.com",
            password: "1q2w3e4rDD!",
        });
        expect(res2.type).toEqual(expect.stringContaining('json'));
        expect(res2.body).not.toHaveProperty('user');
        expect(res2.body).not.toHaveProperty('jwt');
        expect(res2.status).toEqual(400);

    });

});
