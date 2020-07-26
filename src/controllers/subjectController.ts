import CourseScraper from "../util/CourseScraper";
import {Subject} from '../models/subject';

const courseScraper = new CourseScraper()

async function getSubjects(req: any, res:any) {
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
}

export default {
  getSubjects,
}