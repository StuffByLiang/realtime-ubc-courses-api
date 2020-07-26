import mongoose from "mongoose";

export interface Subject {
  subject: string;
  title: string;
  faculty: string;
  endpoint: string;
  link: string;
  hasCourses: boolean;
  lastUpdated?: Date;
}

const subjectSchema = new mongoose.Schema({
  subject: String,
  title: String,
  faculty: String,
  endpoint: String,
  link: String,
  hasCourses: Boolean,
  lastUpdated: Date,
})

export const SubjectModel = mongoose.model('Subject', subjectSchema);
