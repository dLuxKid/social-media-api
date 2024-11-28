import type { NextFunction, Request, Response } from "express";
import tweetModel from "../models/tweet.model";
import AppError from "../utils/error-handlers/app-error";
import catchAsync from "../utils/error-handlers/catch-async-error";

export const getTweets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = (req as any).identity.id;
    // const tweets = await tweetModel
    //   .find()
    //   .sort({ createdAt: -1 })
    //   .populate("user", "username displayname profile_picture");

    const tweets = await tweetModel.aggregate([
      // Match all tweets (adjust match stage if filtering is needed)
      { $match: {} },

      // Sort tweets by creation date (descending)
      { $sort: { createdAt: -1 } },

      // Lookup user details for each tweet
      {
        $lookup: {
          from: "users", // The collection name for users
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },

      // Unwind the user details array (optional, depending on how you want the data)
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },

      // Lookup likes for the logged-in user on the tweets
      {
        $lookup: {
          from: "likes", // The collection name for likes
          let: { current_tweet_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$tweet_id", "$$current_tweet_id"] },
                    { $eq: ["$user_id", user_id] },
                  ],
                },
              },
            },
          ],
          as: "likesByUser",
        },
      },

      // Add a field to indicate whether the logged-in user has liked the tweet
      {
        $addFields: {
          hasLiked: { $gt: [{ $size: "$likesByUser" }, 0] },
        },
      },

      // Project the required fields for the response
      {
        $project: {
          text: 1,
          media: 1,
          likes_count: 1,
          reposts_count: 1,
          replies_count: 1,
          createdAt: 1,
          "user._id": 1,
          "user.username": 1,
          "user.displayname": 1,
          "user.profile_picture": 1,
          hasLiked: 1,
        },
      },
    ]);

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
      media: req.body.media,
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
