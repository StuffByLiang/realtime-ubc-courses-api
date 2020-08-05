import { SectionPageData } from "src/models/pages";
import { SectionPageScraper } from "src/util/scraper";

describe("SectionPageScraper.ts", () => {
  const sectionPageScraper = new SectionPageScraper();

  beforeAll(() => {
    
  })

  it("getData should contain relevent information for CPSC 221 101", async () => {
    const expected: SectionPageData = {
      status: expect.any(String),
      activity: "Web-Oriented Course",
      name: "CPSC 221 101 (Web-Oriented Course)",
      subject: "CPSC",
      course: "221",
      section: "101",
      credits: "4",
      prof: "HEEREN, CINDA",
      term: "1",
      year: "2020",
      schedule: [
        {
          day: "Mon",
          term: "1",
          start_time: "14:00",
          end_time: "15:00",
          building: "",
          room: "",
        },
        {
          day: "Wed",
          term: "1",
          start_time: "14:00",
          end_time: "15:00",
          building: "",
          room: "",
        },
        {
          day: "Fri",
          term: "1",
          start_time: "14:00",
          end_time: "15:00",
          building: "",
          room: "",
        }
      ],
      total_seats_remaining: expect.any(Number),
      currently_registered: expect.any(Number),
      general_seats_remaining: expect.any(Number),
      restricted_seats_remaining: expect.any(Number),
      seats_reserved_for: expect.any(Array),
      textbooks: expect.any(Array),
      link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=101",
    }

    let result = await sectionPageScraper.getData("CPSC", "221", "101");
    expect(result).toMatchObject(expected);
  })

})