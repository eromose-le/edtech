import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "../utils/logger"; // Use logger for production-level logging

dotenv.config();

const { DB_NAME, MONGO_URI } = process.env;

// Validate environment variables
if (!MONGO_URI || !DB_NAME) {
  logger.error(
    "MONGO_URI and DB_NAME must be defined in the environment variables."
  );
  process.exit(1);
}

export const connectDB = async () => {
  try {
    logger.info("Attempting to connect to the database...");
    await mongoose.connect(MONGO_URI, {
      dbName: DB_NAME,
      // useNewUrlParser: true, // Use proper URL parser
      // useUnifiedTopology: true, // Handle MongoDB topology changes
    });
    logger.info("Successfully connected to the database");
    return true;
  } catch (error) {
    logger.error("Database connection failed", error);
    return false;
  }
};
