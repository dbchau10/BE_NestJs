import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, MaxLength, MinLength, ValidateNested, isNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

class company {
  
    @IsNotEmpty()
    _id:mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name: string;
  }
export class CreateUserDto {
    @IsNotEmpty()
    name:string
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    address: string
    @IsNotEmpty()
    age:string
    @IsNotEmpty()
    role:string
    @IsNotEmpty()
    gender:string
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => company)
    company:company
}
export class RegisterUserDto {
    @IsNotEmpty()
    name:string
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
    addres: string
    @IsNotEmpty()
    age:string
    @IsNotEmpty()
    gender:string
}
