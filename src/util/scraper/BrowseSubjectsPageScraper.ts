import { getSiteHtml, trim } from "../helpers";;
import cheerio from "cheerio";
import { BrowseSubjectsPageData, SubjectTableRow } from "../../models/pages";

export class BrowseSubjectsPageScraper {
  /**
   * @returns BrowseCoursesPageData
   */
  async getData(): Promise<BrowseSubjectsPageData> {
    const url: string = "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments";
    const html: string = await getSiteHtml(url);
    return this.parseHtml(html);
  }

  parseHtml(html: string): BrowseSubjectsPageData {
    const $ = cheerio.load(html);
    let subjects: Array<SubjectTableRow> = [];
    let tableRows: Cheerio = $("#mainTable > tbody").children();
    for(let i = 0; i < tableRows.length; i++) {
      let c = this.parseSubjectTableRow($(tableRows[i]));
      subjects.push(c); 
    }
    return {
      subjects,
      link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments"
    };
  }

  parseSubjectTableRow(tableRow: Cheerio): SubjectTableRow {
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
      link: "https://courses.students.ubc.ca" + tableRow.children().eq(0).find("a").attr("href") || null,
      hasCourses
    }; 
  }
}