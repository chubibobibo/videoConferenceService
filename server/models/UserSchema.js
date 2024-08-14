import mongoose from "mongoose";

import { roles } from "../utils/roles.js";

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

export const UserModel = new mongoose.model("UserModel", UserSchema);
