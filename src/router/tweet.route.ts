import type { Router } from "express";
import {
  createTweet,
  deleteTweet,
  getTweet,
  getTweets,
} from "../controllers/tweets.controller";
import {
  handleMediaUpload,
  isAuthenticated,
  protectRoute,
} from "../utils/middlewares";

export default (router: Router) => {
  router.get("/tweet/get-tweets", isAuthenticated, getTweets);
  router.get("/tweet/get-tweets/:tweet_id", getTweet);
  router.post(
    "/tweet/create-tweet",
    protectRoute,
    handleMediaUpload,
    createTweet
  );
  router.delete("/tweet/delete-tweet/:tweet_id", protectRoute, deleteTweet);
};
