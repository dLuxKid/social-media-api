import type { Router } from "express";
import { protectRoute } from "../utils/middlewares";
import {
  deleteReply,
  replyReply,
  replyPost,
} from "../controllers/reply.controller";

export default (router: Router) => {
  router.post("/reply/reply-post", protectRoute, replyPost);
  router.post("/reply/reply-reply", protectRoute, replyReply);
  router.delete("/reply/delete-reply/:reply_id", protectRoute, deleteReply);
};
