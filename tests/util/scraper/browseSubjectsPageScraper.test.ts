import { BrowseSubjectsPageScraper } from "src/util/scraper";
import { BrowseSubjectsPageData, SubjectTableRow } from "src/models/pages";
import { Campus } from "src/models";

describe("BrowseCoursesPageScraper.ts", () => {
  const browseSubjectsPageScraper = new BrowseSubjectsPageScraper();

  beforeAll(() => {
    
  })

  it("should have an array containing CPSC and other courses", async () => {
    const cpscSubject: SubjectTableRow = {
      subject: "CPSC",
      title: "Computer Science",
      faculty: "Faculty of Science",
      hasCourses: true,
      link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=CPSC&campuscd=UBC",
    }
    
    const expected: BrowseSubjectsPageData = {
      subjects: expect.arrayContaining([cpscSubject]),
      link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments&campuscd=UBC"
    }

    let result = await browseSubjectsPageScraper.getData(Campus.vancouver);
    expect(result).toMatchObject(expected);
    expect(result.subjects.length).toBeGreaterThan(20); // definately more than 20 courses... dont know the exact number
  })

  it("should have an array containing COSC if okanagan is specified", async () => {
    const cpscSubject: SubjectTableRow = {
      subject: "COSC",
      title: "Computer Science",
      faculty: "Faculty of Arts and Sciences",
      hasCourses: true,
      link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=COSC&campuscd=UBCO",
    }
    
    const expected: BrowseSubjectsPageData = {
      subjects: expect.arrayContaining([cpscSubject]),
      link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments&campuscd=UBCO"
    }

    let result = await browseSubjectsPageScraper.getData(Campus.okanagan);
    expect(result).toMatchObject(expected);
    expect(result.subjects.length).toBeGreaterThan(10); // definately more than 10 courses... dont know the exact number
  })
})