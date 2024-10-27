import type { Router } from "express";
import {
  deleteUser,
  getProfile,
  getUser,
  updateUser,
} from "../controllers/user.controller";
import { isAuthenticated, protectRoute } from "../utils/middlewares";

export default (router: Router) => {
  router.get("/user/get-user", isAuthenticated, getUser);
  router.get("/user/get-profile/:user_id", getProfile);
  router.put("/user/update-user", protectRoute, updateUser);
  router.put("/user/delete-user", protectRoute, deleteUser);
};
