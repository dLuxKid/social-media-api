import bcrypt from "bcrypt";
import crypto from "crypto";
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please provide a username"],
    },
    displayname: {
      type: String,
      required: [true, "Please provide a displayname"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    bio: {
      type: String,
      minLength: 10,
    },
    profile_picture: String,
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 8,
      select: false,
    },
    is_email_verfied: {
      type: Boolean,
      default: false,
    },
    password_changed_at: Date,
    password_reset_token: String,
    password_reset_token_expires: String,
    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 14);

  next();
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || !this.isNew)
    this.password_changed_at = new Date();

  next();
});

userSchema.pre(/^find/, function (next) {
  (this as mongoose.Query<any, any>).find({ isActive: { $ne: false } });

  next();
});

userSchema.methods.hasChangedPasswordAfter = function (jwt_timestamp: number) {
  if (this.password_changed_at) {
    const changedTimestamp =
      parseInt(this.password_changed_at.getTime()) / 1000;

    return jwt_timestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.password_reset_token = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.password_reset_token_expires = Date.now() + 10 * 60 * 1000; // 10mins expiry date

  return resetToken;
};

export type UserType = mongoose.InferSchemaType<typeof userSchema>;

export default mongoose.model("Users", userSchema);
