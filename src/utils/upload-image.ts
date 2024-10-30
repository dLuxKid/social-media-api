import { v2 as cloudinary } from "cloudinary";
import AppError from "./error-handlers/app-error";

cloudinary.config({
  secure: false,
  cloud_name: "digw06vyy",
  api_key: "474542831494846",
  api_secret: "x7c9Wqro9egQcAAxG7GO83Qe3ow",
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
