import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";

/** Session */
import MongoStore from "connect-mongo";
import session from "express-session";
import { UserModel } from "./models/UserSchema.js";

import passport from "passport";
// import localStrategy from "passport-local";

const app = express();

/** parsing of json */
app.use(cors());
app.use(express.json());

/** Connecting to database */
// getting-started.js
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

/** Configuring Session for passportJS*/
/** User schema needs to be configured to use passport local mongoose (creation of username nad password)*/

/** mongo store to prevent memory leaks */
/** @touchAfter updates session only once in 24hrs */
export const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  secret: process.env.STORE_SECRET,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("session error");
});

/** @store session created to store the session data. comes from the file sessionStore.js  */
/** @cookie will be stored in the browser that will be used to access the session server side */
export const sessionConfig = {
  store,
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
/** Instantiate the session using the session config */
app.use(session(sessionConfig));

/** middleware to initialize passportJS for incoming requests */
app.use(passport.initialize());
app.use(passport.session()); /** allows persistent sessions */

/** test if session and user data exist in every request */
app.use((req, res, next) => {
  console.log(req.user);
  console.log(req.session);
  next();
});

/**allows passport to use the local strategy plugin in the UserModel */
passport.use(UserModel.createStrategy());

/** @serializeUser stores data in session using passport*/
/** @deserializeUser removes data from session */
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

/** Routes */
app.use("/api/users", userRoutes);

/** handler for page not found */
app.use("*", (req, res, next) => {
  res.status(404).json({ message: "Page not found" });
});

/** Express error handler */
app.use((err, req, res, next) => {
  const status = err.status || 400;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
