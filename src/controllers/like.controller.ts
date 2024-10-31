import type { NextFunction, Request, Response } from "express";
import likesModel from "../models/likes.model";
import catchAsync from "../utils/error-handlers/catch-async-error";

export const likeTweet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tweet_id } = req.body;
    const user_id = (req as any).identity.id;

    await likesModel.create({
      tweet_id,
      user_id,
    });

    res.status(201).json({
      status: "success",
      data: null,
    });
  }
);

export const unlikeTweet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tweet_id } = req.body;
    const user_id = (req as any).identity.id;

    await likesModel.deleteOne({
      tweet_id,
      user_id,
    });

    res.status(201).json({
      status: "success",
      data: null,
    });
  }
);
