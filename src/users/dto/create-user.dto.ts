import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    deletedAt: null;
    isDeleted: false
    @IsNotEmpty()
    password: string;
    name: string;
    addres: string
}
