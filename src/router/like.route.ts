import { Router } from "express";
import { likeTweet, unlikeTweet } from "../controllers/like.controller";
import { protectRoute } from "../utils/middlewares";

export default (router: Router) => {
  router.post("/like/like-tweet", protectRoute, likeTweet);
  router.delete("/like/unlike-tweet", protectRoute, unlikeTweet);
};
