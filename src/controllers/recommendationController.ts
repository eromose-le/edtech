import { Request, Response } from "express";
import User from "../models/User";
import Course from "../models/Course";

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
    const engagementHistory = user.engagementHistory;

    const allCourses = await Course.find().lean();

    console.log("check", {
      engagement: engagementHistory,
      course: allCourses,
      userInterests,
      user,
    });

    const recommendedCourses = allCourses
      ?.map((course: { _id: any; tags: string[]; popularity: number }) => {
        let score = 0;

        // Step 1: Match course tags with user interests
        if (course.tags.some((tag) => userInterests.includes(tag))) {
          score += 10; // Add score if there is a match
          console.log("Match - Add score if there is a match", score);
        }

        // Step 2: Add score based on course popularity
        score += course.popularity * 0.5;
        console.log("Add score based on course popularity", score);

        // Step 3: Iterate over engagementHistory and calculate score based on time spent
        engagementHistory?.forEach((engagement) => {
          console.log({ engagement, course }); // Debugging line

          // Check if courseId matches engagement's courseId
          if (engagement.courseId.toString() === course._id.toString()) {
            score += engagement.timeSpent / 100; // Adjust score based on time spent
            console.log("Adjust score based on time spent", score);
          }
        });

        console.log("check-inside", {
          engagementHistory: engagementHistory,
          course: course,
        });

        // Return the course with its calculated score
        console.log("Return the course with its calculated score", {
          course,
          score,
        });
        return { course, score };
      })
      // Step 4: Sort courses by score in descending order and take top 3
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    console.log("recommendedCourses", recommendedCourses);
    // Send the top 3 recommended courses as a response
    res.status(200).json(recommendedCourses);
    // res.status(200).json(recommendedCourses.map((item) => item.course));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
