import {User} from "./objects/User";
import {Response} from "./Response";

export interface UserListResponse extends Response {
    users? : User[]
}
