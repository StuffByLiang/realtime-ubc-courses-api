import { SubjectPageScraper } from "src/util/scraper";
import { CourseTableRow, SubjectPageData } from "src/models/pages";
import { Campus } from "src/models";

describe("SubjectPageScraper.ts", () => {
  const subjectPageScraper = new SubjectPageScraper();

  beforeAll(() => {
    
  })

  it("getData for CPSC should return relevent data", async () => {
    const cpsc221: CourseTableRow = {
      name: "CPSC 221",
      subject: "CPSC",
      course: "221",
      title: "Basic Algorithms and Data Structures",
      link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPSC&course=221&campuscd=UBC",
    }

    const expected: SubjectPageData = {
      subject: "CPSC",
      description: expect.stringContaining("The Department of Computer Science offers several options in first year:"),
      courses: expect.arrayContaining([cpsc221]),
      link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=CPSC&campuscd=UBC"
    }


    let result = await subjectPageScraper.getData("CPSC", Campus.vancouver);
    expect(result).toMatchObject(expected);
    expect(result.courses.length).toBeGreaterThan(10); // definately more than 10 courses... dont know the exact number
  })

})