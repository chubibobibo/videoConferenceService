import express from "express";
const router = express.Router();

import { register, login, logout } from "../controllers/userController.js";

/** rate limiter for API requests */
import { limiter } from "../middleware/rateLimiter.js";

/**validations */
import {
  registerUserValidation,
  loginUserValidation,
} from "../middleware/inputValidation.js";
import passport from "passport";

router.post("/register", registerUserValidation, register);

/** Login route */
/**@err Any error encountered during authentication. */
/** @user The authenticated user object, if authentication is successful. */
/** @info Additional information, typically used for error messages if authentication fails. */
router.post("/login", limiter, loginUserValidation, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err); /** passes the error to the next middleware */
    }
    /** auth failure */
    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message || "Invalid username or password",
      });
    }
    /** if user is authenticated */
    req.login(user, (err) => {
      if (err) {
        return next(err); /** passes the err to the next middleware */
      }
      return login(req, res);
    });
  })(req, res, next);
});

/** logout route */
router.post("/logout", logout);

export default router;
