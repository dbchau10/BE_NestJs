import { compareSync,genSaltSync,hashSync } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model, Types } from 'mongoose';
import { softDeletePlugin, SoftDeleteModel } from 'soft-delete-plugin-mongoose';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>) { }
  hashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash
  }
  // async create(email: string, password: string, name: string) {
  //   const hashPassword = this.hashPassword(password);
  //   const data = await this.userModel.create({ email, password : hashPassword , name })
  //   return data
  // }
  async create(CreateUserDto: CreateUserDto) {
    const hassPassword = this.hashPassword(CreateUserDto.password);
    const data = await this.userModel.create(
      {
        email: CreateUserDto.email,
        password: hassPassword,
        name: CreateUserDto.name
      }
    )
    return data;
  }
  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const data = await this.userModel.findById({
      _id: id
    });
    console.log(data);

    return data;
  }
  async findOneByEmail(email: string) {
    return await this.userModel.findOne({
      email :email
    });

  }
  isValidatePassword(password: string, hash: string){
    return compareSync(password, hash); 
}

  async update(updateUserDto: UpdateUserDto) {

    const data= await this.userModel.updateOne({
      _id: updateUserDto._id
    }, { ...updateUserDto })
    console.log(data);
    
    return data
  }

async  remove(id: string) {
     const data = await this.userModel.softDelete({
      _id: id
    });
    console.log(data);

    return data;
  }
}
