import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please send a text"],
    },
    media: {
      type: [String],
      validate: {
        validator: function (v: any) {
          return v.length <= 4;
        },
        message: "{PATH} exceeds the limit of 4",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a user id"],
    },
    likes_count: Number,
    replies_count: Number,
    repost_count: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Posts", postSchema);
