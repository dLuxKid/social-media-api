import type { Request, Response, NextFunction } from "express";
import tweetModel from "../models/tweet.model";
import catchAsync from "../utils/error-handlers/catch-async-error";
import AppError from "../utils/error-handlers/app-error";

export const getTweets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tweets = await tweetModel
      .find()
      .sort({ createdAt: -1 })
      .populate("user", "username displayname profile_picture");

    res.status(200).json({
      status: "success",
      data: { tweets },
    });
  }
);

export const getTweet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tweet = await tweetModel
      .findById(req.params.tweet_id)
      .populate("user", "username displayname profile_picture");

    res.status(200).json({
      status: "success",
      data: { tweet },
    });
  }
);

export const createTweet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).identity.id;

    const tweet = await tweetModel.create({
      text: req.body.text,
      media: req.body.media || undefined,
      user,
    });

    res.status(200).json({
      status: "success",
      data: { tweet },
    });
  }
);

export const deleteTweet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).identity.id;

    const tweet = await tweetModel.findById(req.params.tweet_id);

    if (!(tweet?.user !== user.id))
      return next(new AppError("Cannot delete another user tweet", 404));

    await tweetModel.findByIdAndDelete(req.params.tweet_id);

    res.status(202).json({
      status: "success",
      data: null,
    });
  }
);
