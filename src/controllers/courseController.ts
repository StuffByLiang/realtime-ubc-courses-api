import { Course } from '../models/course'
import CourseScraper from '../util/CourseScraper'

const courseScraper = new CourseScraper();

async function getCourse(req:any, res:any) {
    const subject = req.params.subject;

  try {                         
    const courses: Array<Course> = await courseScraper.getCourseList(subject);
    res.json({
      courses: courses
    });
  } catch (invalidSubjectError) { 
    res.status(404).send({
      error: invalidSubjectError.message
    });
    console.log("invalid department code"); 
  }
}

export default {
    getCourse
}