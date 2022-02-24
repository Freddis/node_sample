import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {IsEmail, IsNotEmpty, Length} from "class-validator";

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
