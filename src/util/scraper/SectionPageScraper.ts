import { getSiteHtml, trim } from "../helpers";
import { SectionPageData } from "../../models/pages";
import cheerio from "cheerio";

export class SectionPageScraper {
  async getData(subject: string, course: string, section: string): Promise<SectionPageData> {
    const url: string = `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=${subject}&course=${course}&section=${section}`;
    const html: string = await getSiteHtml(url);
    return this.parseHtml(html);
  }

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
  parseHtml(html: string): SectionPageData {
    const $ = cheerio.load(html);
    const textbookList: Array<string> = [];
    const textbookRows: Cheerio = $("body > div.container > div.content.expand > table.sortable.table.table-striped.section-summary > tbody").children();

    textbookRows.each((i: number, element: CheerioElement) => {
      let textbookRow: Cheerio = $(element); 
      let textbookName: string = textbookRow.children().first().text();
      textbookList.push(textbookName);
    });
 
    const infoRow: Cheerio = $("body > div.container > div.content.expand > table.table.table-striped > tbody tr").children();

    let restrictions: Array<string> = [];
    $("ol li").each((i: number, element: CheerioElement)=>{
      let li: Cheerio = $(element);
      for(let line of li.text().split("-OR-")) {
        restrictions.push(line.trim());
      }
    })

    let subject = $("body > div.container > ul > li:nth-child(3) > a").text();
    let course = $("body > div.container > ul > li:nth-child(4)").text().split(" ")[1];
    let section = $("body > div.container > ul > li.active").text().split(" ")[2];
    let building = trim(infoRow.eq(4).text());
    let room = trim(infoRow.eq(5).text());


    return {
      name: $("body > div.container > div.content.expand > h4").text(),
      subject: subject,
      course: course,
      section: section,
      textbooks: textbookList,
      // pre_reqs: [], // TODO this shit gonna be hard as fuck
      prof: trim($("td:contains(Instructor:)").parent().children().last().text()),
      term: infoRow.eq(0).text(),
      year: $("button:contains(Session: )").text().split(" ")[1],
      days: trim(infoRow.eq(1).text()).split(" "),
      start_time: infoRow.eq(2).text(),
      end_time: infoRow.eq(3).text(), 
      total_seats_remaining: parseInt($("td:contains(Total Seats Remaining:)").parent().children().last().text()),
      currently_registered: parseInt($("td:contains(Currently Registered:)").parent().children().last().text()),
      general_seats_remaining: parseInt($("td:contains(General Seats Remaining:)").parent().children().last().text()),
      restricted_seats_remaining: parseInt($("td:contains(Restricted Seats Remaining)").parent().children().last().text()),
      seats_reserved_for: restrictions,
      building: building,
      room: room, 
      credits: $('body > div.container > div.content.expand > p:nth-child(7)').text().split(" ")[2],
      link: `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=${subject}&course=${course}&section=${section}`
    }; 
  }
}