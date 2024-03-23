import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateCompanyDto {
    
    @IsNotEmpty()
    name: string;
    deletedAt: null;
    isDeleted: false
    @IsNotEmpty()
    address: string;
   @IsNotEmpty()
   description:string
}
