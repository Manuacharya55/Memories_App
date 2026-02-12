import express from "express";
import { createMemory, getAllMemories, updateMemory, deleteMemory, getSingleMemory } from "../controllers/Memories.Controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").post(authMiddleware, createMemory).get(authMiddleware,getAllMemories);
router.route("/:id").get(authMiddleware,getSingleMemory).patch(authMiddleware, updateMemory).delete(authMiddleware, deleteMemory);

export default router;