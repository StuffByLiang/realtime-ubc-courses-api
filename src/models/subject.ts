import mongoose from "mongoose";
import { Campus } from "./campus";

export interface Subject {
  subject: string;
  title: string;
  faculty: string;
  endpoint: string;
  link: string;
  hasCourses: boolean;
  campus: Campus;
  lastUpdated?: Date;
}

const subjectSchema = new mongoose.Schema({
  subject: String,
  title: String,
  faculty: String,
  endpoint: String,
  link: String,
  hasCourses: Boolean,
  campus: String,
  lastUpdated: Date,
})

export const SubjectModel = mongoose.model('Subject', subjectSchema);
