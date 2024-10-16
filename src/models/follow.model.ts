import mongoose from "mongoose";

const followsSchema = new mongoose.Schema(
  {
    followed_by_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a user id"],
    },
    followed_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide the user id"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Follows", followsSchema);
