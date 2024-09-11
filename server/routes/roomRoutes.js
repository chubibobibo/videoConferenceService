import express from "express";
const router = express.Router();
import { createRoom, getRoomName } from "../controllers/roomControllers.js";

router.post("/create", createRoom);
router.get("/getRoomName/:id", getRoomName);

export default router;
