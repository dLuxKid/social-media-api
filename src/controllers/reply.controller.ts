import type { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/error-handlers/catch-async-error";
import replyModel from "../models/reply.model";
import AppError from "../utils/error-handlers/app-error";

export const replyPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { text, media, post_id } = req.body;

    const user_id = (req as any).identity.id;

    await replyModel.create({
      text,
      media,
      post_id,
      user_id,
    });

    res.status(201).json({
      status: "success",
      data: null,
    });
  }
);

export const replyReply = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { text, media, post_id, reply_id } = req.body;

    const user_id = (req as any).identity.id;

    await replyModel.create({
      text,
      media,
      post_id,
      reply_id,
      user_id,
    });

    res.status(201).json({
      status: "success",
      data: null,
    });
  }
);

export const deleteReply = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reply_id } = req.params;

    const user_id = (req as any).identity.id;

    const reply = await replyModel.findById(reply_id);

    if (!reply) {
      return next(new AppError("Reply not found", 404));
    }

    if (reply.user_id.toString() !== user_id) {
      return next(new AppError("Cannot delete another user reply", 404));
    }

    await replyModel.deleteOne({
      _id: reply_id,
    });

    res.status(201).json({
      status: "success",
      data: null,
    });
  }
);
