import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {CreateCompanyDto} from  './dto/create-company.dto'
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post("/create")
  create(@Body() createCompanyDto: CreateCompanyDto , @User() user:IUser) {
    return this.companiesService.create(createCompanyDto,user);
  }

  @Get()
  @ResponseMessage('fetch list company')
  findAll(@Query("current") currentPage:string,
  @Query("pageSize") limit:string,
  @Query() qs:string
  ) {
    // return {qs}
    return this.companiesService.findAll(+currentPage,+limit,qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Patch('updateCompany/:id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto,@User() user:IUser) {
    
    return this.companiesService.update(id, updateCompanyDto,user);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string ,@User() user:IUser) {
    console.log("acaf");
    
    return this.companiesService.remove(id ,user);
  }
}
