import { Course, CourseModel } from '../models/course'
import CourseScraper from '../util/CourseScraper'
import { updateAll } from '../util/helpers';

const courseScraper = new CourseScraper();

async function getCourse(req:any, res:any) {
  const subject = req.params.subject;
  const realtime = req.query.realtime; // either 1 (true) or 0/unspecified (false)

  try {                         
    const doesDataExist = await CourseModel.exists({subject});

    if (!doesDataExist || realtime) {
      const courses: Array<Course> = await courseScraper.getCourseList(subject);
      // updates the database entry or create if doesn't exist
      await updateAll(CourseModel, courses, ["subject", "course"])
    }

    const data = await CourseModel.find({subject});

    res.json({
      courses: data
    });
  } catch (error) { 
    res.status(404).send({
      error: error.message
    });
    console.error(error); 
  }
}

async function getAllCourses(req:any, res:any) {
  const realtime = req.query.realtime; // either 1 (true) or 0/unspecified (false)

  try {                         
    const doesDataExist = await CourseModel.exists({});

    if (!doesDataExist || realtime) {
      const courses: Array<Course> = await courseScraper.getAllCourses();
      // updates the database entry or create if doesn't exist
      await updateAll(CourseModel, courses, ["subject", "course"])
    }

    const data = await CourseModel.find({});

    res.json({
      courses: data
    });
  } catch (error) { 
    res.status(404).send({
      error: error.message
    });
    console.error(error); 
  }
}

export default {
    getCourse,
    getAllCourses,
}