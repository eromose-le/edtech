import mongoose, { Document, Schema } from "mongoose";

interface IEngagement extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  timeSpent: number;
  viewedAt: Date;
}

const engagementSchema = new Schema<IEngagement>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  timeSpent: Number,
  viewedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IEngagement>("Engagement", engagementSchema);
