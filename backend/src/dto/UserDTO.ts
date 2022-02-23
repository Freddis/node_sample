import {Matches} from "class-validator"

export class UserDTO {

    fullName: string

    email: string;

    password: string

    // @Matches("password")
    passwordConfirmation: string
}
