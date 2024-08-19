import mongoose from "mongoose";

import { roles } from "../utils/roles.js";

/** create a hashed password using passport local mongoose */
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  roles: {
    type: String,
    enum: Object.values(roles),
  },
});

UserSchema.plugin(passportLocalMongoose);

export const UserModel = new mongoose.model("UserModel", UserSchema);
