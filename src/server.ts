import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import courseRoutes from "./routes/courseRoutes";
import recommendationRoutes from "./routes/recommendationRoutes";
import { connectDB } from "./configs/database";
import { logger, logRequest } from "./utils/logger"; // Use logger for consistent logging

dotenv.config();

const app = express();
const httpServer = createServer(app);

const { PORT, ENVIRONMENT } = process.env;

// Check if required environment variables are missing
if (!PORT) {
  logger.error("PORT is not defined in environment variables.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());
// app.use(logRequest);

// Routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", recommendationRoutes);

httpServer.listen(Number(PORT), async () => {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      logger.error("Database connection failed, shutting down server...");
      process.exit(1);
    }

    logger.info(
      `Environment: ${ENVIRONMENT} | Server is running on port ${PORT} at http://localhost:${PORT}/api`
    );
  } catch (error) {
    logger.error("Error while starting the server:", error);
    process.exit(1); // Exit if something goes wrong
  }
});
