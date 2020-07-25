/*
  Interface of the information on the UBC page that lists the information for a specific section
  example url: https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=110&section=101
*/

export interface SectionPageData {
  name: string;
  subject: string;
  course: string;
  section: string;
  credits: string;
  prof: string; 
  term: string;
  year: string;
  days: Array<string>; 
  start_time: string; 
  end_time: string; 
  building: string;
  room: string;
  total_seats_remaining: number;
  currently_registered: number;
  general_seats_remaining: number;
  restricted_seats_remaining: number;
  seats_reserved_for: Array<string>;
  textbooks: Array<string>;
  link: string; 
}