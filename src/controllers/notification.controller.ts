import type { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/error-handlers/catch-async-error";
import notificationModel from "../models/notification.model";

export const createNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { receiver_id, type } = req.body;

    const sender_id = (req as any).identity.id;

    await notificationModel.create({
      receiver_id,
      sender_id,
      type,
    });

    res.status(201).json({
      status: "success",
      data: null,
    });
  }
);

export const getAllNotifications = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const receiever_id = (req as any).identity.id;

    if (!receiever_id)
      res.status(201).json({
        status: "success",
        data: null,
      });

    const notifications = await notificationModel.find({
      receiever_id,
    });

    res.status(201).json({
      status: "success",
      data: { notifications },
    });
  }
);

export const readNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const receiever_id = (req as any).identity.id;

    await notificationModel.updateOne(
      { _id: id, receiever_id },
      { $set: { read: true } }
    );

    res.status(201).json({
      status: "success",
      data: null,
    });
  }
);
