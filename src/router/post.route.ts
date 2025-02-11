import type { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getUsersPost,
} from "../controllers/posts.controller";
import {
  handleMediaUpload,
  isAuthenticated,
  protectRoute,
} from "../utils/middlewares";

export default (router: Router) => {
  router.get("/post/get-posts", isAuthenticated, getPosts);
  router.get("/post/get-posts/:username", isAuthenticated, getUsersPost);
  router.get("/post/get-post/:post_id", getPost);
  router.post("/post/create-post", protectRoute, handleMediaUpload, createPost);
  router.delete("/post/delete-post/:post_id", protectRoute, deletePost);
};
