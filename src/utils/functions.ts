import bcrypt from "bcrypt";

export const isCorrectPassword = async (
  candidatePassword: string,
  userPassword: string
) => await bcrypt.compare(candidatePassword, userPassword);

export const createResetPasswordOTP = () =>
  Math.floor(1000 + Math.random() * 9000).toString();

export const hasChangedPasswordAfter = function (
  user: any,
  jwt_timestamp: number
) {
  if (user.password_changed_at) {
    const changedTimestamp =
      parseInt(user.password_changed_at.getTime()) / 1000;

    return jwt_timestamp < changedTimestamp;
  }

  return false;
};
