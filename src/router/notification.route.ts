import type { Router } from "express";
import {
  createNotification,
  getAllNotifications,
  readNotification,
} from "../controllers/notification.controller";
import { isAuthenticated, protectRoute } from "../utils/middlewares";

export default (router: Router) => {
  router.get(
    "/notification/get-notifications",
    isAuthenticated,
    getAllNotifications
  );
  router.post(
    "/notification/create-notification",
    protectRoute,
    createNotification
  );
  router.patch(
    "/notification/read-notification",
    protectRoute,
    readNotification
  );
};
