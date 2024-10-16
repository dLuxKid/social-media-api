import express, { Router } from "express";
import authenticationRouter from "./authentication.router";
import userRouter from "./user.router";

const router = express.Router();

export default (): Router => {
  userRouter(router);
  authenticationRouter(router);

  return router;
};
