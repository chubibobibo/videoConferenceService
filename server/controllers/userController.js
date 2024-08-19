import "express-async-errors";

import { ExpressError } from "../ExpressError/ExpressError.js";
import { UserModel } from "../models/UserSchema.js";

export const register = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received", 400);
  }
  /** destructure the req.body to allow adding of hashed password from passport */
  const { username, firstName, lastName, email, password } = req.body;
  const isAdmin = (await UserModel.countDocuments()) === 0;
  req.body.roles = isAdmin ? "admin" : "user";
  const newUser = await UserModel.create({
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    roles: req.body.roles,
  });
  /** @setPassword accepts password from req.body to be hashed by passportJS */
  /** save the modified instance of newUSer */
  await newUser.setPassword(password);
  await newUser.save();
  if (!newUser) {
    throw new ExpressError("Cannot register user");
  }
  res.status(200).json({ message: "Registered new user", newUser });
};
