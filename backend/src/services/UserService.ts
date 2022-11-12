import {User} from "../entities/User";
import {EntityManager, getManager} from "typeorm";
import {UserReadonlyDTO} from "../dto/UserReadonlyDTO";

class UserService {

    constructor(readonly entityManager : EntityManager) {
    }

    async findAll() : Promise<UserReadonlyDTO[]> {
        const users = await this.entityManager.getRepository<User>(User).find();
        const readOnlyUsers = users.map(x => this.convertToView(x));
        return readOnlyUsers;
    }
    protected convertToView(user: User) : UserReadonlyDTO {
        const copy = {...user}
        delete copy.password;
        return copy;
    }

}


const service = new UserService(getManager());

export function useUsers() {
    return service;
}
