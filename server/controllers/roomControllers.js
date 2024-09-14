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

/** get room name controller */
export const getRoomName = async (req, res) => {
  /** @id will be coming from the specific room created in the url of the room*/
  const { id } = req.params;
  if (!id) {
    throw new ExpressError("No id availbale", 400);
  }
  const foundRoomName = await RoomModel.findOne({ roomId: id });
  if (!foundRoomName) {
    throw new ExpressError("Room cannot be found", 400);
  }
  res.status(200).json({ message: "room found", foundRoomName });
};
