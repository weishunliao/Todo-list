import crypto from "crypto";
import { sign } from "jsonwebtoken";
import mongoose from "mongoose";
import env from "../config/environment";
import UserSchema, { IUser, IUserModel } from "../schemas/user";
import dateUtils from "../utils/date";

const { SECRET } = env;
const PAGINATION_LIMIT = 10;

const setPassword = function (this: IUser, password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

const validatePassword = function (this: IUser, password: string) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

const toAuthJSON = function (this: IUser) {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
    role: this.role,
  };
};

const createUser = async (email: string, password: string, role: string) => {
  try {
    const user = new User({ email, password, role });
    user.setPassword(password);
    await user.save();
    return user.toAuthJSON();
  } catch (err) {
    console.error("Error: ", err);
    throw Error("Could not create new user.");
  }
};

const generateJWT = function (this: IUser) {
  const expirationDate = dateUtils.getNowPlus1Year();

  return sign(
    {
      email: this.email,
      id: this._id,
      expiresIn: expirationDate,
    },
    SECRET,
  );
};

const getUserById = async (id: string) => {
  try {
    return await User.findById(id);
  } catch (err) {
    console.error("Error: ", err);
    throw err;
  }
};

const searchUsers = async (searchQuery: string) => {
  try {
    const _ = new RegExp(searchQuery, "i");
    return User.find({ email: { $regex: _ } });
  } catch (err) {
    console.error("Error: ", err);
    throw new Error(
      `Something went wrong when searching users for ${searchQuery}.`,
    );
  }
};

const getNewUsers = async (page: number) => {
  try {
    // @ts-ignore
    // TODO: add createdAt field and sort properly.
    const { docs, total, limit, page: pageNum, pages } = await User.paginate(
      {},
      {
        page,
        limit: PAGINATION_LIMIT,
        lean: true,
      },
    );
    return { users: docs, total, limit, page: pageNum, pages };
  } catch (err) {
    console.error("Error: ", err);
    throw new Error(`Could not get new users.`);
  }
};

UserSchema.methods.generateJWT = generateJWT;

UserSchema.methods.setPassword = setPassword;

UserSchema.methods.validatePassword = validatePassword;

UserSchema.methods.toAuthJSON = toAuthJSON;

UserSchema.statics.createUser = createUser;

UserSchema.statics.getUserById = getUserById;

UserSchema.statics.searchUsers = searchUsers;

UserSchema.statics.getNewUsers = getNewUsers;

const User = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;
