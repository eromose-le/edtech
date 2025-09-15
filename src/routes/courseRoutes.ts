import express from "express";
import { createCourse, getCourses } from "../controllers/courseController";

const router = express.Router();

router.post("/course", createCourse);
router.get("/courses", getCourses);

export default router;
