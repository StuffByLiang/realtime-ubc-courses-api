import mongoose from "mongoose";
import { Schedule } from "./schedule";

export interface Section {
  name: string; // CPSC 221 911
  subject: string; // CPSC 
  course: string; // 221
  section: string; // 911
  status: string; 
  activity: string;
  term: string;
  schedule: Array<Schedule>
  interval: string;
  comments: string;
  link: string;
  endpoint: string;
  lastUpdated?: Date;
}

const sectionSchema = new mongoose.Schema({
  name: String, // CPSC 221 911
  subject: String, // CPSC 
  course: String, // 221
  section: String, // 911
  status: String, 
  activity: String,
  term: String,
  schedule: [{
    day: String,
    start_time: String,
    end_time: String,
    term: String
  }],
  interval: String,
  comments: String,
  link: String,
  endpoint: String,
  lastUpdated: { type: Date, default: Date.now },
})

export const SectionModel = mongoose.model('Section', sectionSchema);

