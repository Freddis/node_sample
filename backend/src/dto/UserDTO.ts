import {Match} from "../validation/match.decorator";
import {IsNotEmpty, Length} from "class-validator";

export class UserDTO {

    @IsNotEmpty()
    fullName: string

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(8,50)
    password: string

    @Match(UserDTO, (s) => s.password,{message: "Passwords do not match"})
    passwordConfirmation: string
}
