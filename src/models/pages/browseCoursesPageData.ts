/*
  Interface of the information on the UBC page that lists all department codes
  example url: https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments
*/

export interface BrowseSubjectsPageData {
  subjects: Array<SubjectTableRow>;
  link: string;
}

/*
  Interface of the information obtainable in a single table row on that page
*/
export interface SubjectTableRow {
  subject: string;
  title: string;
  faculty: string;
  hasCourses: boolean;
  link: string;
}