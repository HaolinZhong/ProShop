import express from "express";
import { authUser, getUserProfile, getUsers, registerUser, updateUserProfile } from "../controller/userController.js"
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers)

router.post("/login", authUser);

router.route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router;