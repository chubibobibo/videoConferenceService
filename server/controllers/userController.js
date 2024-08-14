import "express-async-errors";

import { ExpressError } from "../ExpressError/ExpressError.js";
import { UserModel } from "../models/UserSchema.js";

export const register = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received", 400);
  }
  const isAdmin = (await UserModel.countDocuments()) === 0;
  req.body.roles = isAdmin ? "admin" : "user";
  const newUser = await UserModel.create(req.body);
  if (!newUser) {
    throw new ExpressError("Cannot register user");
  }
  res.status(200).json({ message: "Registered new user", newUser });
};
