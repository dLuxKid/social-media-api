import express, { Router } from "express";
import authenticationRoute from "./authentication.route";
import followRoute from "./follow.route";
import likeRoute from "./like.route";
import replyRoute from "./reply.route";
import tweetRouter from "./tweet.route";
import userRoute from "./user.route";
import notificationRoute from "./notification.route";

const router = express.Router();

export default (): Router => {
  userRoute(router);
  authenticationRoute(router);
  tweetRouter(router);
  likeRoute(router);
  replyRoute(router);
  followRoute(router);
  notificationRoute(router);
  return router;
};
