import { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";
import Engagement from "../models/Engagement"; // Import Engagement model

interface EngagementInput {
  type: string;
  description: string;
  date: Date;
}

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, careerInterest, tags, engagementHistory } = req.body;

  // Start a session for the transaction
  const session = await mongoose.startSession();

  try {
    // Start a transaction
    session.startTransaction();

    // Create a new user
    const user = new User({
      name,
      email,
      careerInterest,
      tags,
      engagementHistory: engagementHistory || [],
    });

    // Save the user within the transaction
    await user.save({ session });

    // Now create the engagement entries, if any
    if (engagementHistory && engagementHistory.length > 0) {
      const engagements: EngagementInput[] = engagementHistory.map(
        (engagement: EngagementInput) => ({
          ...engagement,
          userId: user?._id, // Associate the engagement with the user
        })
      );

      // Save the engagement data within the transaction
      await Engagement.insertMany(engagements, { session });
    }

    // Commit the transaction if both operations were successful
    await session.commitTransaction();
    session.endSession();

    // Respond with the created user
    res.status(201).json(user);
  } catch (error) {
    // If any error occurs, rollback the transaction
    await session.abortTransaction();
    session.endSession();

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

// Get user profile
export const getUserProfile = async (
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

    res.status(200).json(user);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
