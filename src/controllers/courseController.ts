import { Course, CourseModel, Campus } from '../models'
import CourseScraper from '../util/CourseScraper'
import { getCurrentSession, updateAll } from '../util/helpers';

const courseScraper = new CourseScraper();

async function getCourse(req: any, res: any) {
  const subject = req.params.subject.toUpperCase();
  const realtime = req.query.realtime; // either 1 (true) or 0/unspecified (false)
  const campus = req.query.okanagan ? Campus.okanagan : Campus.vancouver; // either 1 (true) or 0/unspecified (false)
  const session = await getCurrentSession()

  try {
    const doesDataExist = await CourseModel.exists({ subject, campus, session });

    if (!doesDataExist || realtime) {
      const courses: Array<Course> = await courseScraper.getCourseList(subject, campus);
      // updates the database entry or create if doesn't exist
      await updateAll(CourseModel, courses, ["subject", "course", "campus"])
    }

    const data = await CourseModel.find({ subject, campus, session });

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

async function getAllCourses(req: any, res: any) {
  const realtime = req.query.realtime; // either 1 (true) or 0/unspecified (false)
  const campus = req.query.okanagan ? Campus.okanagan : Campus.vancouver; // either 1 (true) or 0/unspecified (false)
  const session = await getCurrentSession()

  try {
    const doesDataExist = await CourseModel.exists({ campus, session });

    if (!doesDataExist || realtime) {
      const courses: Array<Course> = await courseScraper.getAllCourses(campus);
      // updates the database entry or create if doesn't exist
      await updateAll(CourseModel, courses, ["subject", "course", "campus"])
    }

    const data = await CourseModel.find({ campus, session });

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