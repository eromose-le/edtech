import { Request, Response } from "express";
import User from "../models/User";
import Course from "../models/Course";
import Engagement from "../models/Engagement";

export const getRecommendations = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userInterests = user.careerInterest.concat(user.tags);

    // Step 1: Fetch courses
    const allCourses = await Course.find();

    // Step 2: Fetch the engagement history of the user from the Engagement model
    const engagementHistory = await Engagement.find({ userId });

    const recommendedCourses = allCourses
      ?.map((course: { _id: any; tags: string[]; popularity: number }) => {
        let score = 0;

        // Step 2.1: Match course tags with user interests
        if (course.tags.some((tag) => userInterests.includes(tag))) {
          score += 10; // Add score if there is a match
        }

        // Step 2.2: Add score based on course popularity
        score += course.popularity * 0.5;

        // Step 2.3: Iterate over engagementHistory and calculate score based on time spent
        engagementHistory?.forEach((engagement) => {
          console.log({ engagement, course }); // Debugging line

          // 2.3.0: Check if courseId matches engagement's courseId
          if (engagement.courseId.toString() === course._id.toString()) {
            score += engagement.timeSpent / 100; // Adjust score based on time spent
          }
        });

        // Return the course with its calculated score
        return { course, score };
      })
      // Step 3: Sort courses by score in descending order and take top 3
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // Step 4: Send the top 3 recommended courses as a response
    res.status(200).json(recommendedCourses);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
