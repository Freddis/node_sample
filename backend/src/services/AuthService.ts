import {User} from "../entities/User";
import {validate, ValidationError} from "class-validator";
import {EntityManager, getManager} from "typeorm";
import {NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {respondWithError} from "../helpers/api";

class AuthService {

    private errors: ValidationError[] = [];

    constructor(readonly entityManager: EntityManager) {

    }

    async createUser(fullName: string, email: string, password: string): Promise<User> {
        this.errors = [];
        const user = new User();
        user.fullName = fullName;
        user.email = email;
        user.password = await bcrypt.hash(password, await bcrypt.genSalt());
        const errors = await validate(user);
        if (errors.length > 0) {
            this.errors = errors;
            return null;
        }

        const existingUser = await this.entityManager.getRepository<User>(User).findOne({email: user.email});
        if (existingUser) {
            const error = new ValidationError();
            error.target = user;
            error.property = "email";
            error.constraints = {"unique": "Email address already registered"};
            this.errors = [error];
            return null;
        }

        const result = await this.entityManager.save<User>(user);
        return result;
    }

    async login(email: string, password: string): Promise<string> {
        this.errors = [];
        const existingUser = await this.entityManager.getRepository<User>(User).findOne({email});

        // no need to tell what exactly has happened
        const errorMessage = "User not found or password doesn't not match";
        if (!existingUser) {
            const error = new ValidationError();
            error.property = "email";
            error.constraints = {"unknown": errorMessage};
            this.errors = [error];
            return null;
        }

        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) {
            const error = new ValidationError();
            error.property = "password";
            error.constraints = {"unknown": errorMessage};
            this.errors = [error];
            return null;
        }

        const token = jwt.sign(
            {fullName: existingUser.fullName, email: existingUser.email},
            process.env.JWT_SECRET,
            {
                expiresIn: "2h",
            }
        );
        return token;
    }

    getErrors(): ValidationError[] {
        return this.errors;
    }

    async authenticate(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.sendStatus(401);
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            console.log(err);
            if (err) {
                return respondWithError(res,'JWT token is invalid, try to login again',403);
            }
            next();
        });
    };

}

const authService = new AuthService(getManager());

export function useAuth() {
    return authService;
}
