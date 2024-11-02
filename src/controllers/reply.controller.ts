import type { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/error-handlers/catch-async-error";
import replyModel from "../models/reply.model";

export const replyTweet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { text, media, tweet_id } = req.body;

    const user_id = (req as any).identity.id;

    await replyModel.create({
      text,
      media,
      tweet_id,
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
    const { text, media, tweet_id, reply_id } = req.body;

    const user_id = (req as any).identity.id;

    await replyModel.create({
      text,
      media,
      tweet_id,
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

    await replyModel.deleteOne({
      _id: reply_id,
      user_id,
    });

    res.status(201).json({
      status: "success",
      data: null,
    });
  }
);
