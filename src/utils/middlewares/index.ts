import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { merge } from "lodash";
import userModel from "../../models/user.model";
import AppError from "../error-handlers/app-error";
import catchAsync from "../error-handlers/catch-async-error";
import { hasChangedPasswordAfter } from "../functions";
import { uploadMedia } from "../upload-image";

interface JwtPayload {
  id: string;
  iat: number;
}

export const protectRoute = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies["jwt"]) {
      token = req.cookies["jwt"];
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to gain access", 401)
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const currentUser = await userModel.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token no longer exists", 401)
      );
    }

    if (hasChangedPasswordAfter(currentUser, decoded.iat)) {
      return next(
        new AppError("User recently changed password! Please log in again", 401)
      );
    }

    merge(req, { identity: currentUser });
    next();
  }
);

export const isAuthenticated = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies["jwt"]) {
      token = req.cookies["jwt"];
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next();

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      const currentUser = await userModel.findById(decoded.id);
      if (!currentUser) return next();

      if (hasChangedPasswordAfter(currentUser, decoded.iat)) return next();

      merge(req, { identity: currentUser });
      return next();
    } catch (err) {
      return next();
    }
  }
);

export const handleMediaUpload = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.media) {
      const uploadedMedia: any[] = await Promise.all(
        req.body.media.map(
          async (mediaUrl: string) => await uploadMedia(mediaUrl)
        )
      );

      req.body.media = uploadedMedia;
    }

    next();
  }
);
