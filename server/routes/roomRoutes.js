import express from "express";
const router = express.Router();
import {
  createRoom,
  getRoomName,
  getAllRooms,
} from "../controllers/roomControllers.js";

router.get("/getAllRooms", getAllRooms);
router.get("/getRoomName/:id", getRoomName);
router.post("/create", createRoom);

export default router;
