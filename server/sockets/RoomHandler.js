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
    socket.emit("room created", {
      roomId: roomId,
      roomName: roomName,
    });
  });

  socket.on("peer-join-room", async (roomName) => {
    const foundRoom = await RoomModel.findOne({ roomName: roomName });
    socket.emit("peer-joined-room", { foundRoom });
  });

  /** Listener for "join-room" */
  /** @peerId logged user id converted by peerjs emitted from RoomPage.jsx */
  /** @username username of logged user emitted from RoomPage */
  /** @foundRoom current room that is created where we are going to push participants using peerId */
  /** @updatedRoom searching for a specific room (room created or joined) to push peerId into participants */
  /** @updatedParticipants async function that will search and update the current room joined by pushing the peerId received into the participants array. */
  socket.on("join-room", async ({ roomId, peerId, username }) => {
    // const updateParticipants = async () => {
    const foundRoom = await RoomModel.findOne({ roomId: roomId });
    if (foundRoom) {
      const updatedRoom = await RoomModel.findOneAndUpdate(
        { roomId: roomId },
        { $push: { participants: peerId } },
        { new: true }
      );
      console.log({ peerId, username, roomId });
      socket.join(roomId);

      /** sends "user-joined" emit to all participants in the room */
      /** @peerId comes from the "join-room emit in RoomPage". This is needed for the "user-joined" listener in RoomContextProvider to call a specific user */
      socket.to(roomId).emit("user-joined", { peerId });
      socket.emit("get-users", {
        roomId,
        participants: updatedRoom.participants,
      });
    }
    // const leaveRoom = ({ peerId, roomId }) => {
    //   socket.to(roomId).emit("user-disconnected", peerId);
    //   console.log("user left the room", peerId);
    // };

    /** socket.on @disconnect listens for a disconnect when a user closes a tab. This executes a callback that searches and updates the specific Room by pulling the participant using it's peerId  */
    /** @socketTo notifies other user in the room (roomId) then sends an emit of "user-disconnected to all users in the room notifying all the users that a user has disconnected." */
    socket.on("disconnect", async () => {
      console.log("Emitted user-disconnected for peer:", peerId);
      await RoomModel.findOneAndUpdate(
        { roomId: roomId },
        { $pull: { participants: peerId } }
        // { safe: true, multi: false }
      );
      socket.to(roomId).emit("user-disconnected", peerId);
      console.log("user left the room", peerId);
    });
  });
};
