/*
  Interface of the unparsed information on the UBC page that lists all the sections and other info for one course
  example url: https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPSC&course=110
*/

import { Schedule } from "../schedule";

export interface CoursePageData {
  name: string;
  subject: string;
  course: string;
  title: string;
  description: string;
  credits: string;
  comments: Array<string>;
  // pre_reqs: string; TODO
  // co_reqs: string; TODO
  sections: Array<SectionTableRow>;
  link: string;
}

export interface SectionTableRow {
  status: string;
  name: string;
  subject: string;
  course: string;
  section: string;
  activity: string;
  term: string;
  interval: string;
  schedule: Array<Schedule>
  comments: string;
  link: string;
}