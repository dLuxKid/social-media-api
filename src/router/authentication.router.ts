import type { Router } from "express";
import { login, signup } from "../controllers/authentication.controller";

export default (router: Router) => {
  router.post("/auth/login", login);
  router.post("/auth/signup", signup);
};
