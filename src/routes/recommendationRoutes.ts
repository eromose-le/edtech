import express from "express";
import { getRecommendations } from "../controllers/recommendationController";

const router = express.Router();

router.get("/recommendations/:userId", getRecommendations);

export default router;
