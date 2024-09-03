import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

import userRoutes from "./routes/userRoutes.js";

/** Session */
import MongoStore from "connect-mongo";
import session from "express-session";
import { UserModel } from "./models/UserSchema.js";

import passport from "passport";
// import localStrategy from "passport-local";

const app = express();

/** Socket.io */
/** @http to create an http server that socket.io can attach to */
/** @Server is socket.io that will upgrade the http server into a web socket connection (bidirectional communication) */
import { Server } from "socket.io";
import http from "http";

/** @server created a new http server that will be upgraded into web socket connection using socket.io */
/** @app express app that is used as argument in the creation of a new http server. */
/** @io new instance of socket.io server. Basically transforms http server into a web socket connection */
/** @origin allows requests from any origin */
/** @methods allowed http methods */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});
/** Establish Socket Connection */
/** @io io.on listens for 'connection' then executes the specified callback fn */
/** @socket parameter is an object that represents connection to a specific client */
/** @roomId id passed during emit when room is created, then passed the id itself in the emit for the listener to have access to it. */
/** @roomId received from the emit in the RoomPage will be used in the listener for join room as argument for socket.join() */
io.on("connection", (socket) => {
  console.log("User is connected");
  /** listener for creating room, emit coming from Banner component when button is create room button is clicked*/
  socket.on("create-room", () => {
    console.log("User created room");
    const roomId = uuidv4();
    socket.emit("room-created", { roomId });
  });
  /** Listener for "join-room" */
  socket.on("join-room", ({ roomId }) => {
    console.log("User joined the room");
    socket.join(roomId);
  });
  /** Disconnecting socket connection */
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

app.use(cors());
/** parsing of json */
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

server.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
