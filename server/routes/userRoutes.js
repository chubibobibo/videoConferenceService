import express from "express";
const router = express.Router();

import { register, login } from "../controllers/userController.js";

/**validations */
import { registerUser } from "../middleware/inputValidation.js";
import passport from "passport";

router.post("/register", registerUser, register);

/** Login route */
/**@err Any error encountered during authentication. */
/** @user The authenticated user object, if authentication is successful. */
/** @info Additional information, typically used for error messages if authentication fails. */
router.post("/login", (req, res, next) => {
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

export default router;
