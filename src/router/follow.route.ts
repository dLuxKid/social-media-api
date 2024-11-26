import { Router } from "express";
import { followUser, unFollowUser } from "../controllers/follow.controller";
import { protectRoute } from "../utils/middlewares";

export default (router: Router) => {
  router.post("/follow/follow-user", protectRoute, followUser);
  router.delete("/follow/unfollow-user", protectRoute, unFollowUser);
};
