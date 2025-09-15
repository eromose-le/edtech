import { Request, Response } from "express";
import Course from "../models/Course";

// Create a new course
export const createCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, category, tags } = req.body;

  const course = new Course({
    title,
    description,
    category,
    tags,
  });

  try {
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

// Get all courses
export const getCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
