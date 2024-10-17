import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import AppError from "../utils/error-handlers/app-error";
import catchAsync from "../utils/error-handlers/catch-async-error";
import { isCorrectPassword } from "../utils/functions";

const signToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await userModel.create({
      username: req.body.username,
      displayname: req.body.displayname,
      email: req.body.email,
      password: req.body.password,
    });

    createSendToken(newUser, 201, res);
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.password)
      return next(new AppError("Please provide email or password", 400));

    const user = await userModel
      .findOne({ email: req.body.email })
      .select("+password");

    if (!user || !isCorrectPassword(req.body.password, user.password))
      return next(new AppError("Incorrect email or password", 401));

    createSendToken(user, 200, res);
  }
);
