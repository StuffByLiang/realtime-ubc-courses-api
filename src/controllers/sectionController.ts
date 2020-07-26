import {Section} from "../models/section";
import CourseScraper from "../util/CourseScraper";

//testing
import GradeScraper from "../util/GradeScraper";


const courseScraper = new CourseScraper()

//testing
const gradeScraper = new GradeScraper();

async function getSections(req : any, res : any) {
  const subject = req.params.subject;
  const course = req.params.course;

  try {                         
    const sections: Array<Section> = await courseScraper.getSectionList(subject, course);
    res.json({
      sections: sections
    });
  } catch (invalidCourseError) {
    res.status(404).send({
      error: invalidCourseError.message
    });
    console.log("invalid department code or course number"); 
  }
}

async function getAverageOfSection  (req : any, res : any) {
    const term = req.params.term;
    const subject = req.params.subject;
    const course = req.params.course;
    const section = req.params.section;
  
    try {
      const average: number = await gradeScraper.getSectionAverage(term, subject, course, section, 2020);
      res.json({
        average: average
      })
    } catch(noAveragePossibleError) {
      res.status(404).send({
        error: noAveragePossibleError.message
      });
      console.log("Cannot compute average from inputs");
    }
  }

export default {
    getSections,
    getAverageOfSection
}