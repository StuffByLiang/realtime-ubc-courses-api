import { BrowseSubjectsPageScraper, CoursePageScraper, SectionPageScraper, SubjectPageScraper } from "./scraper";
import { CourseTableRow, SectionPageData, SectionTableRow, SubjectTableRow } from "../models/pages";
import GradeScraper from "./GradeScraper";
import { InvalidSubjectError, InvalidCourseError, InvalidSectionError } from "../errors";
import { Course, SectionInfo, Section, Subject, SectionInfoModel, Campus } from "../models";

/**
 * high level class that parses course and section information from urls 
 */

export default class CourseScraper {
  browseSubjectsPageScraper = new BrowseSubjectsPageScraper()
  coursePageScraper = new CoursePageScraper()
  sectionPageScraper = new SectionPageScraper()
  subjectPageScraper = new SubjectPageScraper()
  gradeScraper = new GradeScraper()

  /**
   * Returns all of the courses for a specific department, or throws an invalidSubjectError if the courses list is empty
   * 
   * @param  {string} subject      - Department Code
   * @throws {InvalidSubjectError} - Course list is empty
   * @returns Promise              - Courses offered in the Department
   */
  async getCourseList(subject: string, campus: Campus = Campus.vancouver): Promise<Array<Course>> {
    // grab all courses from the subjects page
    const subjectPageData = await this.subjectPageScraper.getData(subject, campus);

    const courses: Array<Course> = [];

    // for all courses, grab the title description and credits from their course page asynchronously
    await Promise.all(
      subjectPageData.courses.map(async (courseTableRow: CourseTableRow) => {
        const { name, subject, course, title, link } = courseTableRow; // destructuring the object
        const { description, credits, comments, session, year } = await this.coursePageScraper.getData(subject, course, campus);

        courses.push({
          name,
          subject,
          course,
          title,
          link,
          campus,
          session,
          year,

          description,
          credits: parseFloat(credits),
          comments,
          endpoint: `/section/${subject}/${course}`,
        });
      })
    );

    if (courses.length === 0) {
      throw new InvalidSubjectError();
    }
    return courses;
  }

  /**
   * Returns all courses at ubc for a specified campus
   * 
   * @param {Campus} campus
   * @returns Promise
   */
  async getAllCourses(campus: Campus): Promise<Array<Course>> {
    const subjectList: Array<Subject> = await this.getSubjectList(campus);

    const result = await Promise.all(subjectList.map(async (subject) => {
      try {
        if (!subject.hasCourses) return [];
        const sectionInfoList = await this.getCourseList(subject.subject, campus);
        console.log("done " + subject.subject)
        return sectionInfoList
      } catch (err) {
        console.log("error " + subject.subject)
        // console.log(err)
        return [];
      }
    }));

    return [].concat.apply([], result);
  }

  /**
  * Returns all of the info for the specified course section, or throws an invalidSectionError either
  * if section is not found for this course or
  * course name or course is invalid 
  * 
  * @param  {string} subject      - Department Code
  * @param  {string} course       - Course #
  * @param  {string} section      - Course section #
  * @throws {InvalidSectionError} - section is not found or course name is invalid
  * @returns Promise              - Section Info
  */
  async getSectionInfo(subject: string, course: string, section: string): Promise<SectionInfo> {
    const sectionPageData: SectionPageData = await this.sectionPageScraper.getData(subject, course, section);

    if (sectionPageData.name == "") {  //if the section name is blank it means that the section doesn't exist. 
      throw new InvalidSectionError();
    }
    // TODO: add prof_rating

    return {
      ...sectionPageData,
      course_avg: await this.gradeScraper.getSectionAverage("W", subject, course, section, parseInt(sectionPageData.year)),
      prof_rating: null,
    };
  }

  /**
   * Returns all of the Sections for the specified course, or throws an invalidCourseError if dept code + course course does not exist
   * e.g. throws an invalidCourseError if getSectionList is called on CPSC 1
   * @param  {string} subject     - Department Code
   * @param  {string} course      - Course #
   * @throws {InvalidCourseError} - course doesnt exist
   * @returns Promise             - Sections offered for the course
   */
  async getSectionList(subject: string, course: string): Promise<Array<Section>> {
    const coursePageData = await this.coursePageScraper.getData(subject, course);

    if (coursePageData.sections.length === 0) {
      throw new InvalidCourseError();
    }

    const { session, year } = coursePageData

    const sectionList: Array<Section> = coursePageData.sections.map((sectionTableRow: SectionTableRow): Section => {
      const { section } = sectionTableRow;
      return {
        ...sectionTableRow,
        endpoint: `/sectionInfo/${subject}/${course}/${section}`,
        session,
        year
      }
    });
    return sectionList;
  }

  /**
   * Returns all of the SectionInfo for each section in a course or throws an invalidCourseError if dept code + course number does not exist
   * e.g. throws an invalidCourseError if getSectionList is called on CPSC 1
   * 
   * @param  {string} subject - Department Code
   * @param  {string} course  - Course #
   * @returns Promise         - Info for all of the sections offered for the course
   */
  async getSectionInfoList(subject: string, course: string): Promise<Array<SectionInfo>> {
    const sectionList: Array<Section> = await this.getSectionList(subject, course);

    const sectionInfoList = await Promise.all(sectionList.map(async (section) => {
      try {
        const sectionInfo: SectionInfo = await this.getSectionInfo(section.subject, section.course, section.section);
        console.log("done " + section.name)
        return sectionInfo;
      } catch (err) {
        console.log("error section " + section.name)
        // console.log(section)
        // console.log(err)
      }
      return null
    }));

    return sectionInfoList;
  }

  /**
   * Returns all sectionInfo for each course in a subject
   * 
   * @param  {string} subject
   * @returns Promise
   */
  async getSectionInfoListForSubject(subject: string): Promise<Array<SectionInfo>> {
    const courseList: Array<Course> = await this.getCourseList(subject);

    const result = await Promise.all(courseList.map(async (course) => {
      try {
        const sectionInfoList = await this.getSectionInfoList(course.subject, course.course);
        console.log("done " + course.name)
        return sectionInfoList;
      } catch (err) {
        console.log("error course " + course.name)
        // console.log(err)
        return []
      }
    }));

    return [].concat.apply([], result);
  }
  /**
   * Returns all sectionInfos at ubc
   * 
   * @returns Promise
   */
  async getAllSectionInfo(): Promise<Array<SectionInfo>> {
    const subjectList: Array<Subject> = await this.getSubjectList();

    const result = await Promise.all(subjectList.map(async (subject) => {
      try {
        if (!subject.hasCourses) return [];
        const sectionInfoList = await this.getSectionInfoListForSubject(subject.subject);
        console.log("done " + subject.subject)
        return sectionInfoList
      } catch (err) {
        console.log("error " + subject.subject)
        // console.log(err)
        return [];
      }
    }));

    return [].concat.apply([], result);
  }

  /**
   * Returns all of the subjects at UBC
   * @returns Promise         - Info for all of the subjects offered at UBC
   */
  async getSubjectList(campus = Campus.vancouver): Promise<Array<Subject>> {
    const browseSubjectsPageData = await this.browseSubjectsPageScraper.getData(campus);
    const subjectList: Array<Subject> = browseSubjectsPageData.subjects.map((subjectTableRow: SubjectTableRow): Subject => {
      const { subject } = subjectTableRow;
      return {
        ...subjectTableRow,
        endpoint: `/course/${subject}`,
        campus,
      }
    });
    return subjectList;
  }
}