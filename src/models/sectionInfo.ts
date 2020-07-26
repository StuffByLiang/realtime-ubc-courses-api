import mongoose from "mongoose";
import {Course} from "./course";

export interface SectionInfo {
    name: string,
    subject: string,
    course: string,
    section: string,
    textbooks: Array<string>;
    pre_reqs?: Array<Array<Course>>;
    prof: string; 
    term: string;
    year: string;
    days: Array<string>; 
    start_time: string; 
    end_time: string; 
    total_seats_remaining: number;
    currently_registered: number;
    general_seats_remaining: number;
    restricted_seats_remaining: number;
    seats_reserved_for: Array<string>;
    building: string;
    room: string;
    credits: string;
    course_avg?: number; 
    prof_rating?: number;
    link: string;
    lastUpdated?: Date;
    }

    const sectionInfoSchema = new mongoose.Schema({
    name: String,
    subject: String,
    course: String,
    section: String,
    textbooks: [String],
    // pre_reqs?: Array<Array<Course>>; // TODO:
    prof: String,
    term: String,
    year: String,
    days: [String],
    start_time: String,
    end_time: String,
    total_seats_remaining: Number,
    currently_registered: Number,
    general_seats_remaining: Number,
    restricted_seats_remaining: Number,
    seats_reserved_for: [String],
    building: String,
    room: String,
    credits: String,
    course_avg: Number,
    prof_rating: Number,
    link: String,
    lastUpdated: Date,
})

export const SectionInfoModel = mongoose.model('SectionInfo', sectionInfoSchema);
