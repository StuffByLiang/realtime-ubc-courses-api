import { getSiteHtml, trim } from "../helpers";
import { CoursePageData, SectionTableRow } from "../../models/pages";
import cheerio from "cheerio";

export class CoursePageScraper {
  async getData(subject: string, course: string): Promise<CoursePageData> {
    const url: string = `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=${subject}&course=${course}`;
    const html: string = await getSiteHtml(url);
    return this.parseHtml(html);
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
  parseHtml(html: string): CoursePageData {
    const $ = cheerio.load(html);
    let sections: Array<SectionTableRow> = []; 
    let tableRows: Cheerio = $("table.table.table-striped.section-summary > tbody").children(); // rows of the table cont. courses
    for(let i = 0; i < tableRows.length; i++) {
        let s = this.parseSectionTableRow($(tableRows[i]));
        sections.push(s); 
    }

    let name = $("li.active").first().text();
    let subject = name.split(" ")[0];
    let course = name.split(" ")[1];
    let comments: Array<string> = $("p:contains(Credits: )").nextAll("ul").children().map((i: number, element: CheerioElement) => {
      let comment: Cheerio = $(element); 
      return trim(comment.text());
    }).get();

    return {
      name,
      subject,
      course,
      title: trim($("h4").first().text().replace($("li.active").first().text(), "")),
      description: $("h4").first().next().text(),
      credits: $("p:contains(Credits: )").text().replace("Credits: ", ""),
      comments,
      sections,
      link: `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=${subject}&course=${course}`,
    };
  }
  /**
   * Given a cheerio/jquery tableRow element, parse it into a Section object. 
   * @param  {Cheerio} tableRow
   * @returns Section
   */
  parseSectionTableRow(tableRow: Cheerio): SectionTableRow {
    const status = trim(tableRow.children().eq(0).text());

    let section: SectionTableRow = {
      status: status === "" ? "Available" : status,
      name: tableRow.children().eq(1).text(),
      subject: tableRow.children().find("a").text().split(" ")[0],
      course: tableRow.children().find("a").text().split(" ")[1],
      section: trim(tableRow.children().find("a").text().split(" ")[2]), // L1A/101/T1A
      activity: tableRow.children().eq(2).text(),
      term: tableRow.children().eq(3).text(),
      interval: tableRow.children().eq(4).text(),
      days: trim(tableRow.children().eq(5).text()).split(" "),
      start_time: tableRow.children().eq(6).text(),
      end_time: tableRow.children().eq(7).text(),
      comments: tableRow.children().eq(8).find(".accordion-body").text().trim(),
      link: "https://courses.students.ubc.ca" + tableRow.children().find("a").attr("href"),
    }

    return section; 
  }
}