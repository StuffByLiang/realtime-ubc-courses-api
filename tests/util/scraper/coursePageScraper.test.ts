import { SectionTableRow, CoursePageData } from "src/models/pages";
import { CoursePageScraper } from "src/util/scraper";
import { search } from "../../../src/util/helpers";

describe("CoursePageScraper.ts", () => {
  const coursePageScraper = new CoursePageScraper();

  beforeAll(() => {
    
  })

  it("getData should return data for CPSC 221 and contain section 101 and L1A", async () => {
    const cpscSection: SectionTableRow = {
      status: expect.any(String),
      name: "CPSC 221 101",
      subject: "CPSC",
      course: "221",
      section: "101",
      activity: "Web-Oriented Course",
      term: "1",
      interval: "",
      schedule: [
        {
          day: "Mon",
          term: "1",
          start_time: "14:00",
          end_time: "15:00",
        },
        {
          day: "Wed",
          term: "1",
          start_time: "14:00",
          end_time: "15:00",
        },
        {
          day: "Fri",
          term: "1",
          start_time: "14:00",
          end_time: "15:00",
        }
      ],
      comments: "If all the lab and/or tutorial seats are full the department will ensure that there are enough lab/tutorial seats available for the number of students registered in the course by either adding additional lab/tutorial sections or expenadind the number of seats in the activity once we know how many extra students we will need to accommodate. However, there is no guarantee that these seats will fit your preferred time.  You may need to change your registration in other courses to get access to a lab/tutorial where there are available seats.",
      link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=101&campuscd=UBC"
    }

    const cpscLab: SectionTableRow = {
      status: expect.any(String),
      name: "CPSC 221 L1A",
      subject: "CPSC",
      course: "221",
      section: "L1A",
      activity: "Laboratory",
      term: "1",
      interval: "",
      schedule: [
        {
          day: "Tue",
          term: "1",
          start_time: "11:00",
          end_time: "13:00",
        }
      ],
      comments: "",
      link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=L1A&campuscd=UBC"
    }
    
    const expected: CoursePageData = {
      name: "CPSC 221",
      subject: "CPSC",
      course: "221",
      title: "Basic Algorithms and Data Structures",
      description: "Design and analysis of basic algorithms and data structures; algorithm analysis methods, searching and sorting algorithms, basic data structures, graphs and concurrency.",
      credits: "4",
      comments: ["Choose one section from all 2 activity types. (e.g. Lecture and Laboratory)"],
      sections: expect.any(Array),
      link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPSC&course=221&campuscd=UBC"
    }

    let result = await coursePageScraper.getData("CPSC", "221");

    let lab = search("name", "CPSC 221 L1A", result.sections);
    let section = search("name", "CPSC 221 101", result.sections);


    expect(result).toMatchObject(expected);
    expect(lab).toMatchObject(cpscLab);
    expect(section).toMatchObject(cpscSection);
    expect(result.sections.length).toBeGreaterThan(20); // definately more than 20 sections... dont know the exact number
  })

})