import type { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/error-handlers/catch-async-error";
import userModel from "../models/user.model";
import AppError from "../utils/error-handlers/app-error";

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).identity;

    res.status(200).json({
      status: "success",
      data: user ? { user } : null,
    });
  }
);

export const getProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.params.user_id;

    const user = await userModel.findById(user_id);

    res.status(200).json({
      status: "success",
      data: { user },
    });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password)
      return next(new AppError(`Cannot update password on this route`, 400));

    const user = await userModel.findByIdAndUpdate(
      (req as any).identity.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: { user },
    });
  }
);

export const deleteUser = catchAsync(async (req, res, next) => {
  await userModel.findByIdAndUpdate((req as any).identity.id, {
    isActive: false,
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
