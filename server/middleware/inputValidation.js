import { body, param, validationResult } from "express-validator";
import { UserModel } from "../models/UserSchema.js";
import { ExpressError } from "../ExpressError/ExpressError.js";
//create a function that will handle the error
//This function will accept an array (validateValues) of valeus to be validated.
//then this function will return the array we passed as an argument and an error response
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req); //this returns all available errors based on the validation provided when checking the incoming request.
      //check if the errors array is not empty meaning there errors.
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((allErrors) => allErrors.msg); //turns the errors from the validationResult into array then mapped it to access the msg key for every item in the original array, then populate the created array with that.
        throw new ExpressError(errorMessages); //use the custom error that we created and pass the errorMessages that we mapped instead of a string.
      }
      next();
    },
  ];
};

/** register input validation */
export const registerUserValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("username cannot be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage(
      "Username should be at least 3 characters and not more than 10 characters "
    ),
  body("firstName")
    .notEmpty()
    .withMessage("firstName cannot be empty")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "Username should be at least 3 characters and not more than 20 characters "
    ),
  body("lastName")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ min: 4, max: 10 })
    .withMessage(
      "Last name should be at least 4 characters and not more than 10 characters "
    ),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Email should be valid")
    .custom(async (email) => {
      const foundEmail = await UserModel.findOne({ email: email });
      if (foundEmail) {
        throw new ExpressError("Email already in use");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters"),
]);

/** login input validation */
export const loginUserValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("username cannot be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage(
      "Username should be at least 3 characters and not more than 10 characters "
    ),
  body("password")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters"),
]);
