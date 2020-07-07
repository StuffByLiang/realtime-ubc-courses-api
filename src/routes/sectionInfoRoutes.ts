import express from 'express';
import Section from "../models/section";
import CourseScraper from "../util/CourseScraper";
import SectionInfo from "../models/sectionInfo";

var router = express.Router();

const courseScraper = new CourseScraper()

//any endpoints beginning with /sectionInfo

router.get("/:subject/:number", async (req, res) => {
  const subject = req.params.subject;
  const number = req.params.number;

  try {                         
    const sectionInfo: Array<SectionInfo> = await courseScraper.getSectionInfoList(subject, number);
    res.json(sectionInfo);
  } catch {
    res.status(404).send("course not found");
    console.log("invalid department code"); 
  }
});

router.get("/:subject/:number/:section", async (req, res) => {
  const subject = req.params.subject;
  const number = req.params.number;
  const section = req.params.section;
  try {                         
    const sectionInfo: SectionInfo = await courseScraper.getSectionInfo(subject, number, section);
    res.json(sectionInfo);
  } catch (err) {
    res.status(404).send({"error" : err.message}); 
  }
});

export default router;