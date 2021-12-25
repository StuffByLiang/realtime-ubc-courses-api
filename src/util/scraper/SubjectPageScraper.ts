import { getSiteHtml } from "../helpers";
import { SubjectPageData, CourseTableRow } from "../../models/pages";
import cheerio from "cheerio";
import { Campus } from "../../models";

export class SubjectPageScraper {
  /**
   * Scrapes a subject from UBC, and returns data in the form of SubjectPageData
   * 
   * @returns BrowseCoursesPageData
   */
  async getData(subject: string, campus: Campus): Promise<SubjectPageData> {
    let url = `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=${subject}`;
    if (campus == Campus.vancouver) {
      url += "&campuscd=UBC";
    } else {
      url += "&campuscd=UBCO";
    }
    const html: string = await getSiteHtml(url);
    return this.parseHtml(html);
  }
  /**
   * Parses an html webpage into SubjectPageData
   * 
   * @param  {string} html
   * @returns SubjectPageData
   */
  parseHtml(html: string): SubjectPageData {
    const $ = cheerio.load(html);
    const courses: Array<CourseTableRow> = [];
    const tableRows: cheerio.Cheerio = $("#mainTable > tbody").children();
    const campusCode = $('.ubc7-campus').text().split(" ")[0].toLowerCase() === 'vancouver' ? 'UBC' : 'UBCO';

    for (let i = 0; i < tableRows.length; i++) {
      const c = this.parseCourseTableRow($(tableRows[i]), campusCode);
      courses.push(c);
    }

    const subject = $("li.active").first().text();
    return {
      subject,
      description: $("h5").first().next().text().trim(),
      courses,
      link: `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=${subject}&campuscd=${campusCode}`,
      year: $("button:contains(Session: )").text().split(" ")[1],
      session: $("button:contains(Session: )").text().split(" ")[1] + $("button:contains(Session: )").text().split(" ")[2][0],
    };
  }
  /** Given a cheerio/jquery tableRow element, return the data in the row as a CourseTableRow
   * 
   * @param  {cheerio.Cheerio} tableRow
   * @returns CourseTableRow
   */
  parseCourseTableRow(tableRow: cheerio.Cheerio, campusCode: string): CourseTableRow {
    const name = tableRow.children().eq(0).text();
    const subject = name.split(" ")[0];
    const course = name.split(" ")[1];
    const title = tableRow.children().eq(1).text();

    return {
      name,
      subject,
      course,
      title,
      link: `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=${subject}&course=${course}&campuscd=${campusCode}`,
    };
  }
}