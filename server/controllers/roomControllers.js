import "express-async-errors";
import { ExpressError } from "../ExpressError/ExpressError.js";
import { RoomModel } from "../models/RoomSchema.js";

export const createRoom = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received", 400);
  }
  const newRoom = await RoomModel.create(req.body);
  if (!newRoom) {
    throw new ExpressError("Cannot create room", 400);
  }
  res.status(200).json({ message: "New room created", newRoom });
};
