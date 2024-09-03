import { ExpressError } from "../ExpressError/ExpressError";
export const authUser = (req, res, next) => {
  if (!req.isAuthenticated) {
    throw new ExpressError("User in not authenticated");
  } else {
    next();
  }
};
