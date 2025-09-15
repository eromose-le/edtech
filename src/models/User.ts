import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  careerInterest: string[];
  tags: string[];
  engagementHistory: Array<{
    courseId: mongoose.Schema.Types.ObjectId;
    timeSpent: number;
    lastViewed: Date;
  }>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  careerInterest: [String],
  tags: [String],
  engagementHistory: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      timeSpent: Number,
      lastViewed: { type: Date, default: Date.now },
    },
  ],
});

// Set default value for engagementHistory to an empty array if it's not provided
userSchema.pre("save", function (next) {
  if (!this.engagementHistory) {
    this.engagementHistory = [];
  }
  next();
});

export default mongoose.model<IUser>("User", userSchema);
