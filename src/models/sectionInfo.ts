import Course from "./course";

export default interface SectionInfo {
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
}
