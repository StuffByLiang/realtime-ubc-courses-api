import express from 'express';
import {Section} from "../models/section";
import CourseScraper from "../util/CourseScraper";
//testing
import GradeScraper from "../util/GradeScraper";

var router = express.Router();
const courseScraper = new CourseScraper()

//testing
const gradeScraper = new GradeScraper();

//any endpoints beginning with /section

router.get("/:subject/:number", async (req, res) => {
  const subject = req.params.subject;
  const number = req.params.number;

  try {                         
    const sections: Array<Section> = await courseScraper.getSectionList(subject, number);
    res.json({
      sections: sections
    });
  } catch (invalidCourseError) {
    res.status(404).send({
      error: invalidCourseError.message
    });
    console.log("invalid department code or course number"); 
  }
});

//testing grade scraper - fuck lol 
router.get('/:term/:subject/:course/:section', async (req, res) => {
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
})

export default router; 