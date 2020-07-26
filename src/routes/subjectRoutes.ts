import express from 'express';
import CourseScraper from "../util/CourseScraper";
import {Subject} from '../models/subject';

var router = express.Router();
const courseScraper = new CourseScraper()

router.get("/", async (req, res) => {
  try {                         
    console.log("lol")
    const subjects: Array<Subject> = await courseScraper.getSubjectList();
    res.json({
      subjects
    });
  } catch (error) {
    res.status(404).send({
      error: error.message
    });
    console.log("unknown error"); 
  }
});

export default router; 