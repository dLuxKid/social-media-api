import { ObjectId } from "bson";
import type { NextFunction, Request, Response } from "express";
import postModel from "../models/post.model";
import AppError from "../utils/error-handlers/app-error";
import catchAsync from "../utils/error-handlers/catch-async-error";

export const getPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = (req as any).identity?.id;

    if (user_id) {
      const posts = await postModel.aggregate(
        [
          // Match all posts (adjust match stage if filtering is needed)
          { $match: {} },
          // Sort posts by creation date (descending)
          { $sort: { createdAt: -1 } },
          // Lookup user details for each post
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
          // Lookup likes for the logged-in user on the posts
          {
            $lookup: {
              from: "likes", // Collection for likes
              let: { postId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$post_id", "$$postId"] }, // Match post_id with current post
                        { $eq: ["$user_id", new ObjectId(user_id)] }, // Match user_id with logged-in user
                      ],
                    },
                  },
                },
              ],
              as: "likesByUser",
            },
          },
          // Add a field to indicate whether the logged-in user has liked the post
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
        data: { posts },
      });
    } else {
      const posts = await postModel.aggregate(
        [
          // Match all posts (adjust match stage if filtering is needed)
          { $match: {} },
          // Sort posts by creation date (descending)
          { $sort: { createdAt: -1 } },
          // Lookup user details for each post
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

          // Add a field to indicate whether the logged-in user has liked the post
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
        data: { posts },
      });
    }
  }
);

export const getUsersPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = (req as any).identity?.id;

    const { username } = req.params;

    if (user_id) {
      const posts = await postModel.aggregate(
        [
          // Lookup user details for each post
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
          // Match all posts (adjust match stage if filtering is needed)
          { $match: { "user.username": username } },
          // Sort posts by creation date (descending)
          // { $sort: { createdAt: -1 } },
          // Lookup likes for the logged-in user on the posts
          {
            $lookup: {
              from: "likes", // Collection for likes
              let: { postId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$post_id", "$$postId"] }, // Match post_id with current post
                        { $eq: ["$user_id", user_id] }, // Match user_id with logged-in user
                      ],
                    },
                  },
                },
              ],
              as: "likesByUser",
            },
          },
          // Add a field to indicate whether the logged-in user has liked the post
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
        data: { posts },
      });
    } else {
      const posts = await postModel.aggregate(
        [
          // Lookup user details for each post
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
          // Match all posts (adjust match stage if filtering is needed)
          { $match: { "user.username": username } },
          // Sort posts by creation date (descending)
          { $sort: { createdAt: -1 } },
          // Add a field to indicate whether the logged-in user has liked the post
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
        data: { posts },
      });
    }
  }
);

export const getPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await postModel
      .findById(req.params.post_id)
      .populate("user", "username displayname profile_picture");

    res.status(200).json({
      status: "success",
      data: { post },
    });
  }
);

export const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).identity.id;

    const post = await postModel.create({
      text: req.body.text,
      media: req.body.media,
      user,
    });

    res.status(200).json({
      status: "success",
      data: { post },
    });
  }
);

export const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).identity.id;

    const post = await postModel.findById(req.params.post_id);

    if (!(post?.user !== user.id))
      return next(new AppError("Cannot delete another user post", 404));

    await postModel.findByIdAndDelete(req.params.post_id);

    res.status(202).json({
      status: "success",
      data: null,
    });
  }
);
