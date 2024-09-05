import express from "express";
const router = express.Router();
import { createRoom } from "../controllers/roomControllers.js";

router.post("/create", createRoom);

export default router;
