import type { Router } from "express";
import {
  createTweet,
  deleteTweet,
  getTweet,
  getTweets,
} from "../controllers/tweets.controller";
import { protectRoute } from "../utils/middlewares";

export default (router: Router) => {
  router.get("/tweet/get-tweets", getTweets);
  router.get("/tweet/get-tweets/:tweet_id", getTweet);
  router.post("/tweet/create-tweet", protectRoute, createTweet);
  router.delete("/tweet/delete-tweet/:tweet_id", protectRoute, deleteTweet);
};
