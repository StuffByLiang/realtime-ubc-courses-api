import { BrowseSubjectsPageScraper } from "src/util/scraper";
import { BrowseSubjectsPageData, SubjectTableRow } from "src/models/pages";

describe("BrowseCoursesPageScraper.ts", () => {
  const browseSubjectsPageScraper = new BrowseSubjectsPageScraper();

  beforeAll(() => {
    
  })

  it("getBrowseCoursePageData should have an array containing CPSC and other courses", async () => {
    const cpscSubject: SubjectTableRow = {
      subject: "CPSC",
      title: "Computer Science",
      faculty: "Faculty of Science",
      hasCourses: true,
      link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=CPSC",
    }
    
    const expected: BrowseSubjectsPageData = {
      subjects: expect.arrayContaining([cpscSubject]),
      link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments"
    }

    let result = await browseSubjectsPageScraper.getData();
    expect(result).toMatchObject(expected);
    expect(result.subjects.length).toBeGreaterThan(20); // definately more than 20 courses... dont know the exact number
  })

})