import type { Router } from "express";
import { protectRoute } from "../utils/middlewares";
import {
  deleteReply,
  replyReply,
  replyTweet,
} from "../controllers/reply.controller";

export default (router: Router) => {
  router.post("/reply/reply-tweet", protectRoute, replyTweet);
  router.post("/reply/reply-reply", protectRoute, replyReply);
  router.delete("/reply/delete-reply/:reply_id", protectRoute, deleteReply);
};
