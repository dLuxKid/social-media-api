import express, { Router } from "express";
import authenticationRouter from "./authentication.route";
import userRouter from "./user.route";
import tweetRouter from "./tweet.route";
import likeRoute from "./like.route";

const router = express.Router();

export default (): Router => {
  userRouter(router);
  authenticationRouter(router);
  tweetRouter(router);
  likeRoute(router);

  return router;
};
