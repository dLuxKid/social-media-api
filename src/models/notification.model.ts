import mongoose from "mongoose";

const notificationModel = new mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a user id"],
    },
    receiever_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a user id"],
    },
    type: {
      type: String,
      enum: ["like", "comment", "repost", "liked_reply", "followed", "replied"],
      required: [true, "Please provide a notification type"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notifications", notificationModel);
