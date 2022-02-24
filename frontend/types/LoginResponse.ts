import {Response} from "./Response";

export interface LoginResponse extends Response{
    jwt? : string
}
