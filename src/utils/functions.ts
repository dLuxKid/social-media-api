import bcrypt from "bcrypt";

export const isCorrectPassword = async (
  candidatePassword: string,
  userPassword: string
) => await bcrypt.compare(candidatePassword, userPassword);
