/** This will contain the refactored socket connections and listeners from server.js */
/** Main socket connection stays in server.js */

import { v4 as uuidv4 } from "uuid";
import { RoomModel } from "../models/RoomSchema.js";

export const roomHandler = (socket) => {
  /** @roomId id passed during emit when room is created, then passed the id itself in the emit for the listener to have access to it. */
  /** @roomId received from the emit in the RoomPage will be used in the listener for join room as argument for socket.join() */
  /** listener for creating room, emit coming from Banner component when button is create room button is clicked*/
  /** creates a new instance of RoomModel using roomId, NOTE: roomName will be implemented later */
  socket.on("create-room", async (roomName) => {
    console.log("User created room");
    const roomId = uuidv4();
    await RoomModel.create({ roomId: roomId, roomName: roomName });
    socket.emit("room-created", { roomId, roomName });
  });
  /** Listener for "join-room" */
  socket.on("join-room", ({ roomId }) => {
    console.log("User joined the room", roomId);
    socket.join(roomId);
  });
};
