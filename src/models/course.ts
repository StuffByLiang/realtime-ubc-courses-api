import mongoose from "mongoose";
import { Campus } from ".";

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
  campus: Campus;
  lastUpdated?: Date;
  year: string;
  session: string;
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
  campus: String,
  lastUpdated: { type: Date, default: Date.now },
  year: String,
  session: String,
})

export const CourseModel = mongoose.model('Course', courseSchema);
