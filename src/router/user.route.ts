import type { Router } from "express";
import {
  deleteUser,
  getProfile,
  getUser,
  updateUser,
} from "../controllers/user.controller";
import {
  handleMediaUpload,
  isAuthenticated,
  protectRoute,
} from "../utils/middlewares";

export default (router: Router) => {
  router.get("/user/get-user", isAuthenticated, getUser);
  router.get("/user/get-profile/:username", getProfile);
  router.put("/user/update-user", protectRoute, handleMediaUpload, updateUser);
  router.put("/user/delete-user", protectRoute, deleteUser);
};
