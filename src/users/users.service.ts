import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model, Types } from 'mongoose';
import { softDeletePlugin, SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { response } from 'express';
import { IUser } from './users.interface';
import aqp from 'api-query-params';
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
      email: email
    });

  }
  isValidatePassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(updateUserDto: UpdateUserDto) {

    const data = await this.userModel.updateOne({
      _id: updateUserDto._id
    }, { ...updateUserDto })
    console.log(data);

    return data
  }

  async remove(id: string) {
    const data = await this.userModel.softDelete({
      _id: id
    });
    console.log(data);

    return data;
  }
  async register(registerUserDto: RegisterUserDto) {
    const hassPassword = this.hashPassword(registerUserDto.password);
    const exitsEmail = registerUserDto.email;
   const isExitsEmail = await this.userModel.find({exitsEmail});
   if(isExitsEmail){
    throw new BadRequestException("email da ton tai tren he thong");
   }
    const data = await this.userModel.create({
      hassPassword,
      ...registerUserDto,
      role: "USER"
    })
    const { _id, createdAt } = data;
    return { _id, createdAt };


  }
  async createUser(CreateUserDto: CreateUserDto) {
    const hassPassword = this.hashPassword(CreateUserDto.password);
    const exitsEmail = CreateUserDto.email;
   const isExitsEmail = await this.userModel.find({exitsEmail});
   if(isExitsEmail){
    throw new BadRequestException("email da ton tai tren he thong");
   }
    const data = await this.userModel.create({
      hassPassword,
      ...CreateUserDto,
    })

    const { _id, createdAt } = data;
    return { _id, createdAt };


  }
  async updateUser(id: string, updateUserDto: UpdateUserDto, user: IUser) {
    const data = await this.userModel.updateOne({
      _id: id
    },
      {
        ...updateUserDto,
        updatedBy: user
      })

    return data

  }
  async deleteUser(id: string, user: IUser) {

    await this.userModel.updateOne({
      _id: id
    },
      {
        deleteBy: user
      })

    return  await this.userModel.softDelete({
      _id: id
    })
  }
  async findUser(id :string){
    return await this.userModel.find({
      _id:id
    })
  }
 async findAllUser(currentPage: number, limit: number,qs:string){
 
  const { filter, sort, projection, population } = aqp(qs);
  delete filter.page;
  delete filter.limit;

  console.log(sort);
  
  let offset = (+currentPage - 1) * (+limit);
  let defaultLimit = +limit ? +limit : 10;
  const totalItems = (await this.userModel.find(filter)).length;
  const totalPages = Math.ceil(totalItems / defaultLimit);
  // if (isEmpty(sort)) {
  //   // @ts-ignore: Unreachable code error
  //   sort = "-updatedAt"
  // }
  const result = await this.userModel.find(filter)
    .skip(offset)
    .limit(defaultLimit)
    .sort(sort as any)
    .populate(population)
    .exec();

  return {
    meta:{
      current:currentPage,
      pageSize:limit,
      pages:totalPages,
      total:totalItems
    },
    result
  }
  }
  updateUserToken = async (refreshToken :string , _id:string)=>{
    await this.userModel.updateOne({
      _id
    },
      {
        refreshToken
      })

  }
  findUserbyToken = async (refreshToken :string )=>{
    const res =  await this.userModel.findOne(
      {
        refreshToken
      })
      return res
  }
}
