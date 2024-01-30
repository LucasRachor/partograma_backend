import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MaxLength(100)
    name: string;

    @MaxLength(8)
    rg: string;

    @MaxLength(10)
    birthday: string;

    @MaxLength(11)
    cpf: string;

    @MaxLength(100)
    @IsEmail()
    email: string;

    createdat: Date;
    updatedat: Date;
}
