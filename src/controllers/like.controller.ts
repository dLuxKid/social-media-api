import type { NextFunction, Request, Response } from "express";
import likesModel from "../models/likes.model";
import catchAsync from "../utils/error-handlers/catch-async-error";
import tweetModel from "../models/tweet.model";

export const likeTweet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tweet_id } = req.body;
    const user_id = (req as any).identity.id;

    const existingLike = await likesModel.findOne({
      tweet_id,
      user_id,
    });

    if (!existingLike)
      await Promise.all([
        likesModel.create({
          tweet_id,
          user_id,
        }),
        tweetModel.findByIdAndUpdate(tweet_id, {
          $inc: { likes_count: 1 },
        }),
      ]);

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

    const existingLike = await likesModel.findOne({
      tweet_id,
      user_id,
    });

    if (existingLike)
      await Promise.all([
        likesModel.deleteOne({
          tweet_id,
          user_id,
        }),
        tweetModel.findByIdAndUpdate(tweet_id, {
          $inc: { likes_count: -1 },
        }),
      ]);

    res.status(201).json({
      status: "success",
      data: null,
    });
  }
);
