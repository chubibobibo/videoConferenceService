import "express-async-errors";

import { ExpressError } from "../ExpressError/ExpressError.js";
import { UserModel } from "../models/UserSchema.js";

/** Registering a new user */
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

/** login user */
/** authentication  will be implemented in the routes using .authenticate() by passportJS */
export const login = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received");
  }
  const loggedUser = await UserModel.findOne({ username: req.body.username });
  if (!loggedUser) {
    throw new ExpressError("User does not exist");
  }
  res.status(200).json({ message: "User found", loggedUser });
};

/** Logout user */
/**@logout provided by passportJs for logging out */
/**@err if error returns the err to the next middleware */
export const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "User logged out" });
  });
};

/** get logged user */
export const loggedUser = async (req, res) => {
  if (!req.user) {
    throw new ExpressError("No logged in user", 400);
  } else {
    const user = await UserModel.findById(req.user.id);
    res.status(200).json({ message: "Logged user", user });
  }
};
