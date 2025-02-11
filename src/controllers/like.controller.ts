import type { NextFunction, Request, Response } from "express";
import likesModel from "../models/likes.model";
import postModel from "../models/post.model";
import catchAsync from "../utils/error-handlers/catch-async-error";

export const likePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { post_id } = req.body;
    const user_id = (req as any).identity.id;

    const existingLike = await likesModel.findOne({
      post_id,
      user_id,
    });

    if (!existingLike)
      await Promise.all([
        likesModel.create({
          post_id,
          user_id,
        }),
        postModel.findByIdAndUpdate(post_id, {
          $inc: { likes_count: 1 },
        }),
      ]);

    res.status(201).json({
      status: "success",
      data: null,
    });
  }
);

export const unlikePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { post_id } = req.body;
    const user_id = (req as any).identity.id;

    const existingLike = await likesModel.findOne({
      post_id,
      user_id,
    });

    if (existingLike)
      await Promise.all([
        likesModel.deleteOne({
          post_id,
          user_id,
        }),
        postModel.findByIdAndUpdate(post_id, {
          $inc: { likes_count: -1 },
        }),
      ]);

    res.status(201).json({
      status: "success",
      data: null,
    });
  }
);
