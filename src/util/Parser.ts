import SectionInfo from "../models/sectionInfo";
import Section from "../models/section";
import Course from "../models/course";
import cheerio from "cheerio";
import { title } from "process";
import GradeScraper from "./GradeScraper"

/**
 * Gets the data of an html document and turns it into Objects
 */
export default class Parser {
  gradeScraper: GradeScraper;

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
  async parseSectionHtml(html: string): Promise<SectionInfo> {
    const $ = cheerio.load(html);
    const textbookList: Array<string> = [];
    const textbookRows: Cheerio = $("body > div.container > div.content.expand > table.sortable.table.table-striped.section-summary > tbody").children();

    textbookRows.each((i: number, element: CheerioElement) => {
      let textbookRow: Cheerio = $(element); 
      let textbookName: string = textbookRow.children().first().text();
      textbookList.push(textbookName);
    });
 
    //https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=121&section=921

    const infoRow: Cheerio = $("body > div.container > div.content.expand > table.table.table-striped > tbody tr").children();

    let restrictions: Array<string> = [];
    $("ol li").each((i: number, element: CheerioElement)=>{
      let li: Cheerio = $(element);
      for(let line of li.text().split("-OR-")) {
        restrictions.push(line.trim());
      }
    })

    let subject = $("body > div.container > ul > li:nth-child(3) > a").text();
    let number = parseInt($("body > div.container > ul > li:nth-child(4)").text().split(" ")[1]);
    let section = $("body > div.container > ul > li.active").text().split(" ")[2];
    let building = infoRow.eq(4).text().trim();
    if (building === "") {
      building = "online";
    }
    let room = infoRow.eq(5).text().trim();
    if (room === "") {
      room = "online";
    }
    this.gradeScraper = new GradeScraper();
  
    let sectionInfo: SectionInfo = {
      name: $("body > div.container > div.content.expand > h4").text(),
      subject: subject,
      number: number,
      section: section,
      textbooks: textbookList,
      // pre_reqs: [], // TODO this shit gonna be hard as fuck
      prof: $("td:contains(Instructor:)").parent().children().last().text(),
      term: parseInt(infoRow.eq(0).text()),
      year: 2020,
      days: infoRow.eq(1).text().trim().split(" "),
      start_time: infoRow.eq(2).text(),
      end_time: infoRow.eq(3).text(), 
      topic: $("body > div.container > div.content.expand > h5").text(),  
      description: $("h5").next().text(),
      total_seats_remaining: parseInt($("td:contains(Total Seats Remaining:)").parent().children().last().text()),
      currently_registered: parseInt($("td:contains(Currently Registered:)").parent().children().last().text()),
      general_seats_remaining: parseInt($("td:contains(General Seats Remaining:)").parent().children().last().text()),
      restricted_seats_remaining: parseInt($("td:contains(Restricted Seats Remaining)").parent().children().last().text()),
      seats_reserved_for: restrictions,
      building: building,
      room: room, 
      num_credits: $('body > div.container > div.content.expand > p:nth-child(7)').text().split(" ")[2],
      course_avg: await this.gradeScraper.getSectionAverage("W", subject, number, section, 2020),
      prof_rating: null,
      link: `/cs/courseschedule?pname=subjarea&tname=subj-section&dept=${subject}&course=${number}&section=${section}`
    }

    return sectionInfo; 
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
    let res: Array<Section> = []; 
    let tableRows: Cheerio = $("table.table.table-striped.section-summary > tbody").children(); // rows of the table cont. courses
    for(let i = 0; i < tableRows.length; i++) {
        let s = this.parseSectionTableRow($(tableRows[i]));
        res.push(s); 
    }
    return res;
  }
  /**
   * Given a cheerio/jquery tableRow element, parse it into a Section object. 
   * @param  {Cheerio} tableRow
   * @returns Section
   */
  parseSectionTableRow(tableRow: Cheerio): Section {
    let status = tableRow.children().first().text().trim();
      let s : Section = {
        name: tableRow.children().eq(1).text(),
        subject: tableRow.children().find("a").text().split(" ")[0],
        number: parseInt(tableRow.children().find("a").text().split(" ")[1]),
        section: tableRow.children().find("a").text().split(" ")[2].trim(), // L1A/101/T1A
        status: status === "" ? "Available" : status,
        endpoint: "/sectionInfo/" + tableRow.find("a").text().split(" ")[0] +  "/"  + tableRow.find("a").text().split(" ")[1] + "/" +  
        tableRow.find("a").text().split(" ")[2].trim(),       // "/course/CPSC/221/L1A",
        link: tableRow.children().find("a").attr("href"),
        term: parseInt(tableRow.children().eq(3).text()),
      }

      return s; 
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
      endpoint: "/section/" + tableRow.find("a").text().split(" ")[0] + "/" + tableRow.find("a").text().split(" ")[1] + "/",
      link: tableRow.find("a").attr("href"),
    }; 

    return course; 

  }
  
  // /**
  //  * Given html text, returns the pre-reqs of that course. 
  //  *  * html string was from a url in the form of
  //  * https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=100&section=101 
  //  * @param  {string} html
  //  * @returns Array
  //  */
  // getPreReqs(html: string): Array<Course[]> {
  //   if(!this.hasPreReqs) {
  //     let res: Array<Course> = [];  
  //     return res; 
  //   } 
  //   else {
  //     // go to urls of pre-req courses. //scrape this 
  //     // instantiate a Course object from each pre-req url 
  //     // Add these all to a list of
  //   }
    


  // }
}