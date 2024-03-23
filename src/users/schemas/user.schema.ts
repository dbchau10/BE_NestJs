import { Schema } from '@nestjs/mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps:true})
export class User {
    @Prop({required:true})
    email: String;
    @Prop({required:true})
    password: String;
    @Prop()
    name: string;
    @Prop()
    age: String;
    @Prop()
    phone:String;
    @Prop()
    address: String;
    @Prop()
    createdAt:Date;
    @Prop()
    updateAt:Date;


}

export const UserSchema = SchemaFactory.createForClass(User);