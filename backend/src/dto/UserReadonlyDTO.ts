import {User} from "../entities/User";

export type UserReadonlyDTO = {
    [K in keyof Omit<User,'password'>]: User[K];
};