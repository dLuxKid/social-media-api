import mongoose from "mongoose";

const likesSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a user id"],
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: [true, "Please provide the post id"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Likes", likesSchema);
