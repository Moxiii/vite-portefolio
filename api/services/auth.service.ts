import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export async function authenticateUser(
  username: string,
  password: string,
) {
  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password,
  );

  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      sub: user._id.toString(),
      username: user.username,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    },
  );

  return token;
}