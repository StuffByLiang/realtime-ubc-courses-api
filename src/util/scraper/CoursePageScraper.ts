import { getSiteHtml, trim } from "../helpers";
import { CoursePageData, SectionTableRow } from "../../models/pages";
import { Campus, Schedule } from "../../models";
import cheerio from "cheerio";

export class CoursePageScraper {
  /**
   * Scrapes the UBC site given a subject and a course and returns course data in the form of CoursePageData
   * 
   * @param  {string} subject
   * @param  {string} course
   * @returns Promise
   */
  async getData(subject: string, course: string, campus: Campus = Campus.vancouver): Promise<CoursePageData> {
    let url: string = `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=${subject}&course=${course}`;
    if(campus == Campus.vancouver) {
      url += "&campuscd=UBC";
    } else {
      url += "&campuscd=UBCO";
    }
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
    const campusCode = $('.ubc7-campus').text().split(" ")[0].toLowerCase() === 'vancouver' ? 'UBC' : 'UBCO';
    
    for(let i = 0; i < tableRows.length; i++) {
      let firstRow = $(tableRows[i]);

      let currentRow = firstRow;
      let nextRow = i != tableRows.length-1 ? $(tableRows[i+1]) : undefined;
      let schedule = this.parseTime(currentRow);
      let terms = [currentRow.children().eq(3).text()];

      while(i != tableRows.length-1 && currentRow.attr('class') === nextRow.attr('class')) {
        // loop until next table row doesnt have same color as previous table row or until last element
        terms.push(nextRow.children().eq(3).text());
        schedule = schedule.concat(this.parseTime(nextRow))
        currentRow = nextRow;
        i++;
        nextRow = i != tableRows.length-1 ? $(tableRows[i+1]) : undefined;
      }

      let s: SectionTableRow = {
        ...this.parseSectionTableRow(firstRow, campusCode),
        schedule,
        term: terms.includes('1-2') || (terms.includes('1') && terms.includes('2')) ? '1-2' : terms[0]
      };

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
      link: `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=${subject}&course=${course}&campuscd=${campusCode}`,
    };
  }
  /**
   * Given a cheerio/jquery tableRow element, parse it into a Section object. 
   * @param  {Cheerio} tableRow
   * @param  {string}  campusCode
   * @returns Section
   */
  parseSectionTableRow(tableRow: Cheerio, campusCode: string): SectionTableRow {
    const status = trim(tableRow.children().eq(0).text());

    let section = {
      status: status === "" ? "Available" : status,
      name: tableRow.children().eq(1).text(),
      subject: tableRow.children().find("a").text().split(" ")[0],
      course: tableRow.children().find("a").text().split(" ")[1],
      section: trim(tableRow.children().find("a").text().split(" ")[2]), // L1A/101/T1A
      activity: tableRow.children().eq(2).text(),
      term: "",
      interval: tableRow.children().eq(4).text(),
      schedule: [],
      comments: tableRow.children().eq(8).find(".accordion-body").text().trim(),
      link: "https://courses.students.ubc.ca" + tableRow.children().find("a").attr("href") + `&campuscd=${campusCode}`,
    }

    return section; 
  }

  /**
   * Given a cheerio/jquery tableRow element, return the times it occurs in
   * @param  {Cheerio} tableRow
   * @returns Array<Time>
   */
  parseTime(tableRow: Cheerio): Array<Schedule> {
    const days = trim(tableRow.children().eq(5).text()).split(" ");

    return days.map((day) => {
      return {
      day: day,
      term: tableRow.children().eq(3).text(),
      start_time: tableRow.children().eq(6).text(),
      end_time: tableRow.children().eq(7).text(),
      }
    })
  }
}