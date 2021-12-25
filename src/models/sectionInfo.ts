import mongoose from "mongoose";
import { Course } from "./course";
import { Schedule } from ".";

export interface SectionInfo {
    status: string,
    activity: string,
    name: string,
    subject: string,
    course: string,
    section: string,
    textbooks: Array<string>;
    pre_reqs?: Array<Array<Course>>;
    prof: string;
    term: string;
    year: string;
    session: string;
    schedule: Array<Schedule>;
    total_seats_remaining: number;
    currently_registered: number;
    general_seats_remaining: number;
    restricted_seats_remaining: number;
    seats_reserved_for: Array<string>;
    credits: string;
    course_avg?: number;
    prof_rating?: number;
    link: string;
    lastUpdated?: Date;
    modeOfDelivery: string;
    requiresInPersonAttendance: string;
}

const sectionInfoSchema = new mongoose.Schema({
    status: String,
    activity: String,
    name: String,
    subject: String,
    course: String,
    section: String,
    textbooks: [String],
    // pre_reqs?: Array<Array<Course>>; // TODO:
    prof: String,
    term: String,
    year: String,
    schedule: [{
        day: String,
        start_time: String,
        end_time: String,
        term: String,
        building: String,
        room: String,
    }],
    total_seats_remaining: Number,
    currently_registered: Number,
    general_seats_remaining: Number,
    restricted_seats_remaining: Number,
    seats_reserved_for: [String],
    credits: String,
    course_avg: Number,
    prof_rating: Number,
    link: String,
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    modeOfDelivery: String,
    requiresInPersonAttendance: String,
    session: String,
})

export const SectionInfoModel = mongoose.model('SectionInfo', sectionInfoSchema);
