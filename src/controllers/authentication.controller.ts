import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel, { type UserType } from "../models/user.model";
import AppError from "../utils/error-handlers/app-error";
import catchAsync from "../utils/error-handlers/catch-async-error";
import { createResetPasswordOTP, isCorrectPassword } from "../utils/functions";

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

    if (!user || !(await isCorrectPassword(req.body.password, user.password)))
      return next(new AppError("Incorrect email or password", 401));

    createSendToken(user, 200, res);
  }
);

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user)
      return next(new AppError("Account with email does not exist", 404));

    // try {
    // @ts-ignore
    const otp = createResetPasswordOTP();

    //   if (process.env.NODE_ENV === "production") {
    //     resetURL = `${process.env.PROD_FRONTEND_URL}/reset-password/?token=${resetToken}`;
    //   } else {
    //     resetURL = `${process.env.DEV_FRONTEND_URL}/reset-password/?token=${resetToken}`;
    //   }

    //   new Email(user, resetURL).sendPasswordReset();

    user.password_reset_token = otp;
    user.password_reset_token_expires = Date.now() + 10 * 60 * 1000; // 10mins expiry date;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "OTP has been sent to email",
      data: { otp },
    });
    // } catch (err) {
    //   user.password_reset_token = undefined;
    //   user.password_reset_token_expires = undefined;

    //   await user.save({ validateBeforeSave: false });

    //   console.log(err);
    //   return next(
    //     new AppError(
    //       "There was an error sending the email. Try again later",
    //       500
    //     )
    //   );
    // }
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { otp, password } = req.body;

    const user = await userModel.findOne({
      password_reset_token: otp,
      password_reset_token_expires: { $gt: Date.now() },
    });

    if (!user) return next(new AppError("Invalid OTP", 404));

    user.password = password;
    user.password_reset_token = undefined;
    user.password_reset_token_expires = undefined;

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password updated succesfully",
    });
  }
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword } = req.body;

    const user = await userModel
      .findById((req as any).user.id)
      .select("+password");

    if (!user) return next(new AppError("This user does not exist", 404));

    if (!(await isCorrectPassword(currentPassword, user.password)))
      return next(new AppError("Incorrect password", 401));

    user.password = newPassword;
    await user.save();

    createSendToken(user, 200, res);
  }
);
