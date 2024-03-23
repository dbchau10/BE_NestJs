import { Schema } from '@nestjs/mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({timestamps:true})
export class Company {
    @Prop({required:true})
    name: String;
    @Prop({required:true})
    address: String;
    @Prop()
    description: string;

    @Prop()
    createdAt:Date;
    @Prop()
    updateAt:Date;

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

export const CompanySchema = SchemaFactory.createForClass(Company);