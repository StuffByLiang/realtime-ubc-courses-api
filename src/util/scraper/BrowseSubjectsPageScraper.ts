import { getSiteHtml, trim } from "../helpers";
import cheerio from "cheerio";
import { BrowseSubjectsPageData, SubjectTableRow } from "../../models/pages";
import { Campus } from "../../models";

export class BrowseSubjectsPageScraper {
  /**
   * Scrapes the UBC site and returns all data in an object of the form BrowseSubjectsPageData
   * 
   * @returns BrowseCoursesPageData
   */
  async getData(campus: Campus): Promise<BrowseSubjectsPageData> {
    let url = "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments";
    if (campus == Campus.vancouver) {
      url += "&campuscd=UBC";
    } else {
      url += "&campuscd=UBCO";
    }
    const html: string = await getSiteHtml(url);
    return this.parseHtml(html);
  }

  /**
   * Given a webpage, return BrowseSubjectsPageData
   * 
   * @param  {string} html
   * @returns BrowseSubjectsPageData
   */
  parseHtml(html: string): BrowseSubjectsPageData {
    const $ = cheerio.load(html);
    const subjects: Array<SubjectTableRow> = [];
    const tableRows: cheerio.Cheerio = $("#mainTable > tbody").children();

    const campusCode = $('.ubc7-campus').text().split(" ")[0].toLowerCase() === 'vancouver' ? 'UBC' : 'UBCO';

    for (let i = 0; i < tableRows.length; i++) {
      const c = this.parseSubjectTableRow($(tableRows[i]), campusCode);
      subjects.push(c);
    }
    return {
      subjects,
      link: `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments&campuscd=${campusCode}`,
      year: $("button:contains(Session: )").text().split(" ")[1],
      session: $("button:contains(Session: )").text().split(" ")[1] + $("button:contains(Session: )").text().split(" ")[2][0],
    };
  }

  /**
   * Given a tablerow, parse info so that it returns a SubjectTableRow
   * 
   * @param  {cheerio.Cheerio} tableRow
   * @returns SubjectTableRow
   */
  parseSubjectTableRow(tableRow: cheerio.Cheerio, campusCode: string): SubjectTableRow {
    let subject = trim(tableRow.children().eq(0).text());
    const title = trim(tableRow.children().eq(1).text());
    const faculty = trim(tableRow.children().eq(2).text());
    let hasCourses = true;
    if (subject.includes("*")) {
      hasCourses = false;
      subject = subject.split(" ")[0];
    }

    return {
      subject,
      title,
      faculty,
      link: "https://courses.students.ubc.ca" + ((tableRow.children().eq(0).find("a").attr("href") + `&campuscd=${campusCode}`) || '/'),
      hasCourses
    };
  }
}