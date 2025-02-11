import { Router } from "express";
import { likePost, unlikePost } from "../controllers/like.controller";
import { protectRoute } from "../utils/middlewares";

export default (router: Router) => {
  router.post("/like/like-post", protectRoute, likePost);
  router.delete("/like/unlike-post", protectRoute, unlikePost);
};
