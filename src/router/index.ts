import express, { Router } from "express";
import authenticationRoute from "./authentication.route";
import followRoute from "./follow.route";
import likeRoute from "./like.route";
import replyRoute from "./reply.route";
import postRouter from "./post.route";
import userRoute from "./user.route";
import notificationRoute from "./notification.route";

const router = express.Router();

export default (): Router => {
  userRoute(router);
  authenticationRoute(router);
  postRouter(router);
  likeRoute(router);
  replyRoute(router);
  followRoute(router);
  notificationRoute(router);

  return router;
};
