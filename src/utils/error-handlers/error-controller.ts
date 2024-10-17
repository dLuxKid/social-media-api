import type { NextFunction, Request, Response } from "express";
import AppError from "./app-error";
import { Error as MongooseError } from "mongoose";

const sendErrorDev = (error: AppError, res: Response) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    error,
  });
};

const sendErrorProd = (error: AppError, res: Response) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

const handleCastErrorDB = (err: MongooseError.CastError): AppError =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateFieldsDB = (err: MongooseError): AppError =>
  new AppError(
    `user with email "${
      (err as any).keyValue.email
    }" already exists. Please use another email!`,
    400
  );

const handleValidationErrorDB = (err: MongooseError.ValidationError) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data: ${errors.join(", ")}`;
  return new AppError(message, 400);
};

const handleJsonWebTokenError = () =>
  new AppError("Invalid Token, Please log in again", 401);

const handleTokenExpiredError = () =>
  new AppError("Expired Token, Please log in again", 401);

const globalErrorController = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    console.log("production error", err);

    let error = err;
    error.message = err.message;

    if (error.name === "CastError")
      error = handleCastErrorDB(error as unknown as MongooseError.CastError);

    if (error.code === 11000)
      error = handleDuplicateFieldsDB(error as MongooseError);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(
        error as unknown as MongooseError.ValidationError
      );
    if (error.name === "JsonWebTokenError") error = handleJsonWebTokenError();
    if (error.name === "TokenExpiredError") error = handleTokenExpiredError();

    sendErrorProd(error, res);
  }
};

export default globalErrorController;
