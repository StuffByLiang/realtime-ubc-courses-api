import { getSiteHtml } from "../helpers";
import { SubjectPageData, CourseTableRow } from "../../models/pages";
import cheerio from "cheerio";

export class SubjectPageScraper {
  /**
   * @returns BrowseCoursesPageData
   */
  async getData(subject: string): Promise<SubjectPageData> {
    const url: string = `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=${subject}`;
    const html: string = await getSiteHtml(url);
    return this.parseHtml(html);
  }

  parseHtml(html: string): SubjectPageData {
    const $ = cheerio.load(html);
    let courses: Array<CourseTableRow> = [];
    let tableRows: Cheerio = $("#mainTable > tbody").children();
    for(let i = 0; i < tableRows.length; i++) {
      let c = this.parseCourseTableRow($(tableRows[i]));
      courses.push(c); 
    }

    const subject = $("li.active").first().text();
    return {
      subject,
      description: $("h5").first().next().text().trim(),
      courses,
      link: `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=${subject}`
    };
  }

  parseCourseTableRow(tableRow: Cheerio): CourseTableRow {
    const name = tableRow.children().eq(0).text();
    const subject = name.split(" ")[0];
    const course = name.split(" ")[1];
    const title = tableRow.children().eq(1).text();

    return {
      name,
      subject,
      course,
      title,
      link: `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=${subject}&course=${course}`,
    }; 
  } 
}