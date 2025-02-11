import { v2 as cloudinary } from "cloudinary";
import AppError from "./error-handlers/app-error";

cloudinary.config({
  secure: false,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
  invalidate: true,
  resource_type: "auto" as "auto",
};

export const uploadMedia = async (url: string) => {
  try {
    const result = await cloudinary.uploader.upload(url, options);
    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new AppError("Error uploading", 500);
  }
};
