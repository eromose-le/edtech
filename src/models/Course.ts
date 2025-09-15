import mongoose, { Document, Schema } from "mongoose";

interface ICourse extends Document {
  title: string;
  description: string;
  popularity: number;
  category: string;
  tags: string[];
}

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: String,
  popularity: { type: Number, default: 0 },
  category: String,
  tags: [String],
});

export default mongoose.model<ICourse>("Course", courseSchema);
