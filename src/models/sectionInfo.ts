import Course from "./course";

export default interface SectionInfo {
    name: string,
    subject: string,
    number: number,
    section: string,
    textbooks: Array<string>;
    pre_reqs: Array<Course>;
    prof: string; 
    term: number; 
    days: Array<string>; 
    start_time: string; 
    end_time: string; 
    topic: string; 
    description: string; 
    total_seats_remaining: number;
    currently_registered: number;
    general_seats_remaining: number;
    restricted_seats_remaining: number;
    seats_reserved_for: Array<string>;
    building: string;
    room: string;
    num_credits: number;
    course_avg?: number; 
    prof_rating?: number;
    link: string; 
}
