import { MongoModel } from './MongoModel';

export class UserBaseRequestModel extends MongoModel {
    public UserId?: string;
    public Token: string;
    public Username: string;
    public Password: string;
}
