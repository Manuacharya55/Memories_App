import express from "express"
import { loginUser, registerUser } from "../controllers/User.Controller.js";
import { getProfile, UpdatePassword, UpdateProfile } from "../controllers/Profile.Controller.js";
import { authMiddleware } from "../middlewares/Auth.Middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware,getProfile);
router.patch("/update-password", authMiddleware,UpdatePassword);
router.patch("/update-profile", authMiddleware,UpdateProfile);

export default router;