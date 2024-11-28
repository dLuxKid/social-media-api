import type { NextFunction, Request, Response } from "express";
import followModel from "../models/follow.model";
import userModel from "../models/user.model";
import catchAsync from "../utils/error-handlers/catch-async-error";

export const followUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { followed } = req.body;

    const followed_by = (req as any).identity.id;

    await Promise.all([
      followModel.create({
        followed,
        followed_by,
      }),
      userModel.findByIdAndUpdate(followed, {
        $push: { followers: followed_by },
      }),
      userModel.findByIdAndUpdate(followed_by, {
        $push: { following: followed },
      }),
    ]);

    res.status(201).json({
      status: "success",
      data: null,
    });
  }
);

export const unFollowUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { followed } = req.body;

    const followed_by = (req as any).identity.id;

    await Promise.all([
      followModel.deleteOne({
        followed,
        followed_by,
      }),
      userModel.findByIdAndUpdate(followed, {
        $pull: { followers: followed_by },
      }),
      userModel.findByIdAndUpdate(followed_by, {
        $pull: { following: followed },
      }),
    ]);

    res.status(201).json({
      status: "success",
      data: null,
    });
  }
);
