import SectionInfo from "../models/sectionInfo";
import Section from "../models/section";
import Course from "../models/course";
import cheerio from "cheerio";
import { title } from "process";



export class Parser {
  /**
   * Converts html text into sectionInfo Object
   * 
   * html string was from a url in the form of
   * https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=100&section=101 
   * 
   * @param  {string} html
   * @returns section_info 
   * 
   */
  parseSectionHtml(html: string): SectionInfo {
    const $ = cheerio.load(html);
    const textbookList: Array<string> = [];
    const textbookRows: Cheerio = $("body > div.container > div.content.expand > table.sortable.table.table-striped.section-summary > tbody").children();

    textbookRows.each((i: number, element: CheerioElement) => {
      let textbookRow: Cheerio = $(element); 
      let textbookName: string = textbookRow.children().first().text();
      textbookList.push(textbookName);
    });
    // for (let i = 0; i < textbookRows.length; i++) {
    //   textbookList[i] = $(`body > div.container > div.content.expand > table.sortable.table.table-striped.section-summary > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text();
    // }

    // const prereqElements: Cheerio = $("body > div.container > div.content.expand > p:nth-child(11)").children();
    // prereqElements.each((index: number, element: CheerioElement) => {
    //   let prereq: Cheerio = $(element);
    //   let preqreqName: string = prereqElements.children().first().text();
    // });
 
    //https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=121&section=921

    let section: SectionInfo = {
      name: $("body > div.container > div.content.expand > h4").text(),
      subject: $("body > div.container > ul > li:nth-child(3)").text(),
      number: parseInt($("body > div.container > ul > li:nth-child(4)").text().split(" ")[1]),
      section: $("body > div.container > ul > li.active").text().split(" ")[2],
      textbooks: textbookList,
      pre_reqs: [],
      prof: "Wong, Jessica",
      term: 1,
      days: ["Tue", "Thu"],
      start_time: "15:30",
      end_time: "17:00", 
      topic: "Computation Thinking",
      description: "Meaning and impact of computational thinking Solving problems using computational thinking, testing, debugging. How computers work. No prior computing experience required. Not for students with existing credit for or exemption from CPSC 107, CPSC 1 ",
      total_seats_remaining: 69420,
      currently_registered: 69,
      general_seats_remaining: 420,
      restricted_seats_remaining: 42,
      seats_reserved_for: ["BSC in year: <=2"],
      building: "CU",
      room: "ICCS 69420",
      num_credits: 3,
      course_avg: 69,
      prof_rating: 4.20,
      link: "cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=100&section=101"
    }

    return section; 
  }
  /**   
   * Converts html text into a an array of Section objects
   * 
   * html string was from a url in the form of 
   * https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPSC&course=100
   * aka the url redirects to the course registration page 
   * @param  {string} html
   * @returns Array<Section> 
   */
  parseSectionListHtml(html: string): Array<Section> {
    const $ = cheerio.load(html);
    return null;
  }
  /**
   * 
   * Converts html text into array of SectionInfo Objects
   * html string was from a url in the form of 
   * https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPSC&course=100
   * aka the url redirects to the course registration page 
   * @param  {string} html 
   * @returns Array<SectionInfo> 
   */
  parseSectionInfoListHtml(html: string): Array<SectionInfo> {
    const $ = cheerio.load(html);
    return null;
  }

  /**
   * 
   * Converts html text into array of Course Objects
   * html string was from a url in the form of 
   * https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=CPSC   
   * aka the url redirects to the course subject page 
   * @param  {string} html
   * @returns Array<Course> 
   */
  parseCourseListHtml(html: string): Array<Course> {
    const $ = cheerio.load(html); 
    let res : Array<Course> = []; 
    let tableRows: Cheerio = $("#mainTable > tbody").children();
    for(let i = 0; i < tableRows.length; i++) {
      let c = this.parseCourseTableRow($(tableRows[i]));
      res.push(c); 
    }
    return res;
  }

  /**
   * Given a cheerio/jquery tableRow element, parse it into a course object
   * 
   * @param  {Cheerio} tableRow
   * @returns Course
   */
  parseCourseTableRow(tableRow: Cheerio): Course {

    // $("#mainTable > tbody").children().first()
    let course: Course = {
      name: tableRow.find("a").text(),  // CPSC 221 
      subject : tableRow.find("a").text().split(" ")[0],
      number: Number(tableRow.find("a").text().split(" ")[1]), 
      title: tableRow.children().last().text(),  
      endpoint: "/course/" + tableRow.find("a").text().split(" ")[0] + "/" + tableRow.find("a").text().split(" ")[1] + "/",
      link: tableRow.find("a").attr("href"),
    }; 

    return course; 
  
  }
  
  /**
   * Converts html text into a Course object 
   * html string was from a url in the form of 
   *    
   * @param  {string} html
   * @returns Course
   */
  parseCourse(html: string): Course {
    return null; 
  }
}