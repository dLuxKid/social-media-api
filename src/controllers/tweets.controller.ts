import { ObjectId } from "bson";
import type { NextFunction, Request, Response } from "express";
import tweetModel from "../models/tweet.model";
import AppError from "../utils/error-handlers/app-error";
import catchAsync from "../utils/error-handlers/catch-async-error";

export const getTweets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = (req as any).identity?.id;

    if (user_id) {
      const tweets = await tweetModel.aggregate(
        [
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
              from: "likes", // Collection for likes
              let: { tweetId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$tweet_id", "$$tweetId"] }, // Match tweet_id with current tweet
                        { $eq: ["$user_id", new ObjectId(user_id)] }, // Match user_id with logged-in user
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
        ],
        { allowDiskUse: true }
      );

      res.status(200).json({
        status: "success",
        data: { tweets },
      });
    } else {
      const tweets = await tweetModel.aggregate(
        [
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

          // Add a field to indicate whether the logged-in user has liked the tweet
          {
            $addFields: {
              hasLiked: false,
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
        ],
        { allowDiskUse: true }
      );

      res.status(200).json({
        status: "success",
        data: { tweets },
      });
    }
  }
);

export const getUsersTweet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = (req as any).identity?.id;

    const { username } = req.params;

    if (user_id) {
      const tweets = await tweetModel.aggregate(
        [
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
          // Match all tweets (adjust match stage if filtering is needed)
          { $match: { "user.username": username } },
          // Sort tweets by creation date (descending)
          // { $sort: { createdAt: -1 } },
          // Lookup likes for the logged-in user on the tweets
          {
            $lookup: {
              from: "likes", // Collection for likes
              let: { tweetId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$tweet_id", "$$tweetId"] }, // Match tweet_id with current tweet
                        { $eq: ["$user_id", user_id] }, // Match user_id with logged-in user
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
        ],
        { allowDiskUse: true }
      );

      res.status(200).json({
        status: "success",
        data: { tweets },
      });
    } else {
      const tweets = await tweetModel.aggregate(
        [
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
          // Match all tweets (adjust match stage if filtering is needed)
          { $match: { "user.username": username } },
          // Sort tweets by creation date (descending)
          { $sort: { createdAt: -1 } },
          // Add a field to indicate whether the logged-in user has liked the tweet
          {
            $addFields: {
              hasLiked: false,
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
        ],
        { allowDiskUse: true }
      );

      res.status(200).json({
        status: "success",
        data: { tweets },
      });
    }
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
