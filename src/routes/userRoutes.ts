import express from "express";
import { createUser, getUserProfile } from "../controllers/userController";

const router = express.Router();

router.post("/user", createUser);
router.get("/user/:userId", getUserProfile);

export default router;
