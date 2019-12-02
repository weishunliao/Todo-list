import { Document, Model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";

export interface IUser extends Document {
  email: string;
  hash: string;
  salt: string;
  role: string;
  generateJWT();
  setPassword(password: string): boolean;
  validatePassword(password: string): boolean;
  toAuthJSON();
}

export interface IUserModel extends Model<IUser> {
  createUser(email: string, password: string, role: string): IUser;
  getUserById(id: string): IUser;
  setPassword(password: string): boolean;
  searchUsers(searchQuery: string): IUser;
  getNewUsers(page: number): [IUser];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  role: { type: String, required: true }, // 'admin' or 'cs'
});

UserSchema.plugin(mongoosePaginate);

export default UserSchema;
