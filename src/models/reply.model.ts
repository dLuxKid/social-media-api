import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please provide a text"],
    },
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
    media: {
      type: [String],
      validate: {
        validator: function (v: any) {
          return v.length <= 4;
        },
        message: "{PATH} exceeds the limit of 4",
      },
    },
    reply_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Replies",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Replies", replySchema);
