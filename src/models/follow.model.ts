import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    followed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a user id"],
    },
    followed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide the user id"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Follow", followSchema);
