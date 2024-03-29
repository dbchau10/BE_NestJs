import { Schema } from '@nestjs/mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps:true})
export class User {
    @Prop({required:true})
    email: String;
    @Prop({required:true}) //,select: false
    password: String;
    @Prop()
    name: string;
    @Prop()
    age: String;
    @Prop()
    gender: String;
    @Prop()
    phone:String;
    @Prop()
    address: String;
    @Prop()
    role:string
    @Prop()
    refreshToken:string
    @Prop({type:Object})
    @Prop()
    createdAt:Date;
    @Prop()
    updateAt:Date;
    @Prop()
    deletedAt: boolean;
    @Prop()
    isDeleted: false
    company: {
        _id:mongoose.Schema.Types.ObjectId;
        name:string
    };
    @Prop({type:Object})
    updatedBy:{
        _id:mongoose.Schema.Types.ObjectId;
        email:string
    };
    @Prop({type:Object})
    deleteBy:{
        _id:mongoose.Schema.Types.ObjectId;
        email:string
    };
    @Prop({type:Object})
    createdBy:{
        _id:mongoose.Schema.Types.ObjectId;
        email:string
    }



}

export const UserSchema = SchemaFactory.createForClass(User);