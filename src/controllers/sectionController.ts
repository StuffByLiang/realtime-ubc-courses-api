import {Section, SectionModel} from "../models/section";
import CourseScraper from "../util/CourseScraper";

//testing
import GradeScraper from "../util/GradeScraper";
import { updateAll } from "../util/helpers";


const courseScraper = new CourseScraper()

//testing
const gradeScraper = new GradeScraper();

async function getSections(req : any, res : any) {
  const subject = req.params.subject;
  const course = req.params.course;
  const realtime = req.query.realtime; // either 1 (true) or 0/undefined/null (false)


  try {
    const doesDataExist = await SectionModel.exists({subject, course});

    if (!doesDataExist || realtime) {                     
      const sections: Array<Section> = await courseScraper.getSectionList(subject, course);
      // updates the database entry or create if doesn't exist
      await updateAll(SectionModel, sections, ["subject", "course", "section"])
    }

    const data = await SectionModel.find({subject, course});
    res.json({
      sections: data
    });
  } catch (error) {
    res.status(404).send({
      error: error.message
    });
    console.error(error); 
  }
}

async function getAverageOfSection(req : any, res : any) {
    const term = req.params.term;
    const subject = req.params.subject;
    const course = req.params.course;
    const section = req.params.section;
  
    try {
      const average: number = await gradeScraper.getSectionAverage(term, subject, course, section, 2020);
      res.json({
        average: average
      })
    } catch(error) {
      res.status(404).send({
        error: error.message
      });
      console.error(error); 
    }
  }

export default {
    getSections,
    getAverageOfSection
}