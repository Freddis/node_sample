import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {IsEmail, IsNotEmpty, Length} from "class-validator";

//@todo: Need to have another variant of that DTO, that doesn't expose the password hash. At that point, I think having 3 DTO for User is already enough for such small project.
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 80})
    @Length(5,80)
    @IsNotEmpty()
    fullName: string;

    @Column({unique: true, nullable: false, length: 80})
    @IsNotEmpty()
    @IsEmail()
    @Length(1,80)
    email: string;

    @Column({nullable: false, length: 150})
    @IsNotEmpty()
    password: string;

}
