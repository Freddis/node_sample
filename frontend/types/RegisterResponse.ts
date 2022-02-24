import {Response} from "./Response";
import {User} from "./objects/User";

export interface RegisterResponse extends Response{
   user? : User,
   jwt? : string,
}
