import { Schema } from 'mongoose';
import { BaseModel } from './BaseModel';
export class MongoModel extends BaseModel {
    public __v?: Schema.Types.Number = undefined;
}
