import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide a user id"],
    },
    tweet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweets",
      required: [true, "Please provide the tweet id"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bookmarks", bookmarkSchema);
