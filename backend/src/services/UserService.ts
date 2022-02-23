import {User} from "../entities/User";
import {EntityManager, getManager} from "typeorm";

class UserService {

    constructor(readonly entityManager : EntityManager) {

    }

    findAll() : Promise<User[]> {
        return this.entityManager.getRepository<User>(User).find();
    }

}


const service = new UserService(getManager());

export function useUsers() {
    return service;
}
