import CourseScraper from "../util/CourseScraper";
import {Subject, SubjectModel} from '../models/subject';
import { updateAll } from "../util/helpers";

const courseScraper = new CourseScraper()

async function getSubjects(req: any, res:any) {
  const realtime = req.query.realtime; // either 1 (true) or 0/unspecified (false)

  try {                         
    const doesDataExist = await SubjectModel.exists({});

    if (!doesDataExist || realtime) {
      const subjects: Array<Subject> = await courseScraper.getSubjectList();
      // updates the database entry or create if doesn't exist
      await updateAll(SubjectModel, subjects, ["subject"])
    }

    const data = await SubjectModel.find({});
    res.json({
      subjects: data
    });
  } catch (error) {
    res.status(404).send({
      error: error.message
    });
    console.error(error); 
  }
}

export default {
  getSubjects,
}