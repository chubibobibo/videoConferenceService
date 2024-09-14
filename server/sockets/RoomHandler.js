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
    try {
      await RoomModel.create({
        roomId: roomId,
        roomName: roomName,
      });
    } catch (err) {
      console.log(err);
    }
    socket.emit("room-created", {
      roomId: roomId,
      roomName: roomName,
    });
    return;
  });
  /** Listener for "join-room" */
  /** @peerId logged user id converted by peerjs emitted from RoomPage.jsx */
  /** @username username of logged user emitted from RoomPage */
  /** @foundRoom current room that is created where we are going to push participants using peerId */
  /** @updatedRoom searching for a specific room (room created or joined) to push peerId into participants */
  socket.on("join-room", ({ roomId, peerId, username }) => {
    const updateParticipants = async () => {
      const foundRoom = await RoomModel.findOne({ roomId: roomId });
      if (foundRoom && peerId !== null) {
        const updatedRoom = await RoomModel.findOneAndUpdate(
          { roomId: roomId },
          { $push: { participants: peerId && peerId } },
          { new: true }
        );
        // console.log(updatedRoom);
        console.log({ peerId, username, roomId });
        if (peerId) {
          console.log(`User id: ${peerId} joined the room id: ${roomId}`);
        }
        socket.join(roomId);
        socket.emit("get-users", {
          roomId,
          participants: updatedRoom.participants,
        });
      }
    };
    updateParticipants();
  });
};
