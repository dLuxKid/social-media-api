import express, { Router } from "express";
import authenticationRouter from "./authentication.route";
import userRouter from "./user.route";
import tweetRouter from "./tweet.route";

const router = express.Router();

export default (): Router => {
  userRouter(router);
  authenticationRouter(router);
  tweetRouter(router);

  return router;
};
