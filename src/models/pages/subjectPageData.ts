/*
  Interface of the information on the UBC page that lists all the courses for one subject
  example url: https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=CPSC
*/

export interface SubjectPageData {
  subject: string;
  description: string;
  courses: Array<CourseTableRow>;
  link: string;
}

export interface CourseTableRow {
  name: string;
  subject: string;
  course: string;
  title: string;
  link: string;
}