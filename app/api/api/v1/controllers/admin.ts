import { NextFunction, Request, Response } from "express";
import passport from "passport";
import User from "../../../../models/user";
import errors from "../../../../utils/errors";
import logger from "../../../../utils/logger";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, role } = req.body;

    if (!email) {
      throw errors.invalidParams("Email is required.", next);
    }

    if (!password) {
      throw errors.invalidParams("Password is required.", next);
    }

    if (!role) {
      throw errors.invalidParams("Role is required.", next);
    }

    const _user = await User.createUser(email, password, role);
    return res.send({ user: _user });
  } catch (err) {
    logger.error("Error: ", err);
    return errors.internalError(next);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  // email, newPassword
  const { email } = req.body;

  try {
    await User.findOneAndDelete({ email });
    return res.sendStatus(200);
  } catch (err) {
    logger.error("Error: ", err);
    return errors.internalError(next);
  }
};

const resetUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { newPassword } = req.body;
  // @ts-ignore
  const { email } = req.payload;
  try {
    const user = (await User.findOne({ email }))!;
    user.setPassword(newPassword);
    await user.save();
    return res.sendStatus(200);
  } catch (err) {
    logger.error("Error: ", err);
    return errors.internalError(next);
  }
};

const updateUserPasswordById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId, password } = req.body;
  try {
    const user = await User.getUserById(userId);
    user.setPassword(password);
    await user.save();
    return res.send({ user });
  } catch (err) {
    logger.error("Error: ", err);
    return errors.internalError(next);
  }
};

const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw errors.invalidParams("Email is required.", next);
    }

    if (!password) {
      throw errors.invalidParams("Password is required.", next);
    }

    return passport.authenticate(
      "local",
      { session: false },
      (err, passportUser, info) => {
        if (err) {
          logger.error("Error: ", err);
          return errors.customError("Invalid credentials.", next);
        }

        if (passportUser) {
          const user = passportUser;
          user.token = passportUser.generateJWT();
          return res.send({ user: user.toAuthJSON() });
        }

        return errors.customError("Invalid credentials.", next);
      },
    )(req, res, next);
  } catch (err) {
    logger.error("Error: ", err);
    return errors.internalError(next);
  }
};

const current = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  try {
    // @ts-ignore
    const { id } = req.payload;
    const user = await User.getUserById(id);
    if (user) {
      return res.send({ user: user.toAuthJSON() });
    } else {
      return errors.customError("Could not find user.", next);
    }
  } catch (err) {
    logger.error("Error: ", err);
    return errors.internalError(next);
  }
};

export default {
  createUser,
  deleteUser,
  resetUserPassword,
  login,
  current,
  updateUserPasswordById,
};
