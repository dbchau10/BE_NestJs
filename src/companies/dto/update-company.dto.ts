import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCompanyDto   {
    _id :string;
    @IsNotEmpty()
    name: string;
    @IsOptional()
    address: string;
    @IsOptional()
   description:string
}