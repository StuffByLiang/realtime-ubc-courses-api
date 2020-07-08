import SectionInfo from "../models/sectionInfo";
import Section from "../models/section";
import Course from "../models/course";
import Parser from "./Parser";
import invalidSubjectError from "../errors/invalidSubjectError";
import invalidSectionError from "../errors/invalidSectionError";
import invalidCourseError from "../errors/invalidCourseError";
/**
 * high level class that parses course and section information from urls 
 */
const axios = require('axios').default;

export default class CourseScraper {
  parser: Parser;

  constructor() {
    this.parser = new Parser();
  }

  /**
   * sends a request to the url and gets the entire html as a string
   * 
   * @param  {string} url - link to the webpage
   * @returns string      - webpage html document as string
   * 
   * @example
   * getSiteContent("https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=101")
   */
  async getSiteHtml(url: string): Promise<string> {
    try {
      let res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.error(error)
    }
  } 
  /**
   * Returns all of the courses for a specific department, or throws an invalidSubjectError if the courses list is empty
   * 
   * @param  {string} subject - Department Code
   * @returns Promise         - Courses offered in the Department
   */
  async getCourseList(subject: string): Promise<Array<Course>> {
    //https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPSC&course=121
    const url: string = `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=${subject}`;
    const html: string = await this.getSiteHtml(url);

    const courses: Array<Course> = this.parseCourseListHtml(html);
    if(courses.length === 0) {
      throw new invalidSubjectError(); 
    }
    return courses;
  }
  
  // talked about this on discord 
  /**
   * Returns all of the info for the specified course section, or throws an invalidSectionError either
   * if section is not found for this course or
   * course name or number is invalid 
   * 
   * @param  {string} subject - Department Code
   * @param  {string} number  - Course #
   * @param  {string} section - Course section #
   * @returns Promise         - Section Info
   */
  async getSectionInfo(subject: string, number: string, section: string): Promise<SectionInfo> {
    const url: string = `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=${subject}&course=${number}&section=${section}`;
    const html: string = await this.getSiteHtml(url);
    const sectionInfo: SectionInfo = await this.parseSectionHtml(html);
    if(sectionInfo.name == "") {  //if the section name is blank it means that the section doesn't exist. 
      throw new invalidSectionError(); 
    }
    return sectionInfo;
  }
  /**
   * Returns all of the Sections for the specified course, or throws an invalidCourseError if dept code + course number does not exist
   * e.g. throws an invalidCourseError if getSectionList is called on CPSC 1
   * @param  {string} subject - Department Code
   * @param  {string} number  - Course #
   * @returns Promise         - Sections offered for the course
   */
  async getSectionList(subject: string, number: string): Promise<Array<Section>> {
    const url: string = `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=${subject}&course=${number}`;
    const html: string = await this.getSiteHtml(url);
    const sectionList: Array<Section> = this.parseSectionListHtml(html);
    if(sectionList.length === 0) throw new invalidCourseError(); 
    return sectionList;
  }
  /**
   * Returns all of the SectionInfo for each section in a course or throws an invalidCourseError if dept code + course number does not exist
   * e.g. throws an invalidCourseError if getSectionList is called on CPSC 1
   * 
   * @param  {string} subject - Department Code
   * @param  {string} number  - Course #
   * @returns Promise         - Info for all of the sections offered for the course
   */
  async getSectionInfoList(subject: string, number: string): Promise<Array<SectionInfo>> {
    //TODO 
    return null; 
    // getSectionList -> forEach(getSectionInfo) <-- run all asyncronously
    // return sectionInfoList;
  }
  
  async parseSectionHtml(html: string): Promise<SectionInfo> {
    return await this.parser.parseSectionHtml(html);
  }
  parseSectionListHtml(html: string): Array<Section> {
    return this.parser.parseSectionListHtml(html);
  }

  parseCourseListHtml(html: string): Array<Course> {
    return this.parser.parseCourseListHtml(html);
  }
  // parseCourse(html: string): Course {
  //   return this.parser.parseCourse(html); 
  // }
  
}