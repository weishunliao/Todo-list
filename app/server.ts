const SEMVER = "0.0.1";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import env from "./config/environment";
import "./config/passport"; // TODO: may need to move to after models.
import "./mongoose";
const { CORS_ORIGIN_WHITELIST, PORT } = env;

import { errorHandler } from "./api/api/v1/middleware/errorHandler";
import errors from "./utils/errors";

import adminRouter from "./api/api/v1/routes/admin";
import boardRouter from "./api/api/v1/routes/board";

const corsOptions = {
  origin(origin: any, callback: any) {
    if (CORS_ORIGIN_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.error(`${origin} is not allowed by CORS.`);
      callback(new Error(`Not allowed by CORS`));
    }
  },
};

const port = process.env.PORT || PORT;
const POST_LIMIT = `50mb`;

const app = express();

app.use(bodyParser.json({ limit: POST_LIMIT }));
app.use(bodyParser.urlencoded({ limit: POST_LIMIT, extended: true }));
app.use(cors());

app.use(`/api/v1/admin`, adminRouter);
app.use(`/api/v1/board`, boardRouter);

app.get(`/status`, (_, res) => {
  return res.send({
    status: `ok`,
    env: process.env.node_env || "local",
    semver: SEMVER,
  });
});

app.use((req, res, next) => {
  return errors.notFound(req, next);
});

app.use(errorHandler);

app.listen(port, () => {
  return console.info(`APP server started on port ${port} 🎉`);
});

export default app;
