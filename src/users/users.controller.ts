import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { testGuard } from './test.guard';
import { IS_PUBLIC_KEY, Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() CreateUserDto :CreateUserDto) {
    return this.usersService.createUser(CreateUserDto)
  }
  @Post("getUser")
  create(@Body() CreateUserDto :CreateUserDto) {
    return this.usersService.create(CreateUserDto)
  }
  @UseGuards(testGuard)


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('update')
  update( @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
  @Public()
  @ResponseMessage("Create user")
  @Post('/auth/register')
  register(@Body() registerUserDto :RegisterUserDto){
    return this.usersService.register(registerUserDto)
  }

  @Patch("updateUser")
  updateUser(
  @Body()  updateUserDto :UpdateUserDto,
  @User() user:IUser){
    return this.usersService.updateUser(updateUserDto._id,updateUserDto,user)
  }
  @Delete(":id")
  deleteUser(
    @User() user:IUser,
    @Param('id') id :string){
    return this.usersService.deleteUser(id,user)
  }
  @Get(":id")
  findUser(
    @Param('id') id :string){
    return this.usersService.findUser(id)
  }
  @Get()
  getUser(@Query("page") currentpage:number,
  @Query("limit") limit:number,
  @Query() qs:string,
  ){
    return this.usersService.findAllUser(currentpage,limit,qs)
  }
}
