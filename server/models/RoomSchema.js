import mongoose from "mongoose";

const { Schema } = mongoose;

const RoomSchema = new Schema(
  {
    roomName: {
      type: String,
    },
    roomId: {
      type: String,
      required: true,
    },
    participants: {
      type: Array,
    },
  },
  { timestamps: true }
);

export const RoomModel = new mongoose.model("RoomModel", RoomSchema);
