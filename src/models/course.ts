import mongoose from "mongoose";

export interface Course {
  name: string;
  subject: string;
  course: string;
  title: string;
  description: string;
  credits: number;
  comments: Array<string>;
  endpoint: string;
  link: string;
  lastUpdated?: Date;
}

const courseSchema = new mongoose.Schema({
  name: String,
  subject: String,
  course: String,
  title: String,
  description: String,
  credits: Number,
  comments: [String],
  endpoint: String,
  link: String,
  lastUpdated: { type: Date, default: Date.now },
})

export const CourseModel = mongoose.model('Course', courseSchema);
