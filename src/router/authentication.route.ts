import type { Router } from "express";
import {
  forgotPassword,
  login,
  resetPassword,
  signup,
  updatePassword,
} from "../controllers/authentication.controller";
import { protectRoute } from "../utils/middlewares";

export default (router: Router) => {
  router.post("/auth/login", login);
  router.post("/auth/signup", signup);
  router.post("/auth/forgot-password", forgotPassword);
  router.put("/auth/reset-password", resetPassword);
  router.put("/auth/update-password", protectRoute, updatePassword);
};
