import {User} from "../entities/User";
import {validate, ValidationError} from "class-validator";
import {EntityManager, getManager} from "typeorm";

class AuthService {

    private errors: ValidationError[] = [];

    constructor(readonly entityManager: EntityManager) {

    }

    async createUser(fullname: string, email: string, password: string): Promise<User> {
        const user = new User();
        user.fullName = fullname;
        user.email = email;
        user.password = password;
        const errors = await validate(user);
        if (errors.length > 0) {
            this.errors = errors;
            return null;
        }
        const result = await this.entityManager.save<User>(user);

        return result;
    }

    getErrors(): ValidationError[] {
        return this.errors;
    }
}

const authService = new AuthService(getManager());

export function useAuth() {
    return authService;
}
