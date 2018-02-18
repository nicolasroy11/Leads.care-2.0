import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export interface IUserSchema extends mongoose.Document {
    UserId: mongoose.Schema.Types.String,
    Name: mongoose.Schema.Types.String,
    Username: mongoose.Schema.Types.String,
    Password: mongoose.Schema.Types.String,
    Salt: mongoose.Schema.Types.String,
    Email: mongoose.Schema.Types.String
}

const _userSchema: mongoose.Schema = new mongoose.Schema({
    UserId: { type: mongoose.Schema.Types.String, unique: true },
    Name: { type: mongoose.Schema.Types.String, required: true },
    Username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    Password: { type: mongoose.Schema.Types.String, required: true },
    Email: { type: mongoose.Schema.Types.String, unique: true },
    Salt: mongoose.Schema.Types.String
});

_userSchema.pre('save', function (next) {
    this.UserId = this._id.toHexString();
    this.Password = bcrypt.hashSync(this.Password, 10);
    next();
});

_userSchema.post('save', function () {
});

_userSchema.set('toJSON', { getters: true, virtuals: true });

export const UserSchema = mongoose.model<IUserSchema>('User', _userSchema, 'User');
