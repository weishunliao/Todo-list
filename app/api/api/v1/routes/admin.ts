// TODO: role-based auth.
import express from "express";
import jwt from "express-jwt";
import env from "../../../../config/environment";
import adminController from "../controllers/admin";

const { SECRET } = env;

const router = express.Router();

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(" ")[0] === "Token") {
    return authorization.split(" ")[1];
  }

  return null;
};

const auth = {
  required: jwt({
    secret: SECRET,
    userProperty: "payload",
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: SECRET,
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

router.post("/createUser", auth.optional, adminController.createUser);

router.post("/login", auth.optional, adminController.login);

router.post("/current", auth.required, adminController.current);

router.post(
  "/resetUserPassword",
  auth.optional,
  adminController.resetUserPassword,
);

export default router;
