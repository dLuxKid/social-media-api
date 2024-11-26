import type { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/error-handlers/catch-async-error";
import followModel from "../models/follow.model";

export const followUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { followed } = req.body;

    const followed_by = (req as any).identity.id;

    await followModel.create({
      followed,
      followed_by,
    });

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

    await followModel.deleteOne({
      followed,
      followed_by,
    });

    res.status(201).json({
      status: "success",
      data: null,
    });
  }
);
