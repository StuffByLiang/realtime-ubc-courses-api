import CourseScraper from "../util/CourseScraper";
import {Subject, SubjectModel} from '../models/subject';
import { updateAll } from "../util/helpers";
import { Campus } from "../models";

const courseScraper = new CourseScraper()

async function getSubjects(req: any, res:any) {
  const realtime = req.query.realtime; // either 1 (true) or 0/unspecified (false)
  const campus = req.query.okanagan ? Campus.okanagan : Campus.vancouver; // either 1 (true) or 0/unspecified (false)

  console.log(campus);

  try {                         
    const doesDataExist = await SubjectModel.exists({campus});

    console.log(doesDataExist);

    if (!doesDataExist || realtime) {
      const subjects: Array<Subject> = await courseScraper.getSubjectList(campus);
      // updates the database entry or create if doesn't exist
      console.log("updating")
      await updateAll(SubjectModel, subjects, ["subject", "campus"])
    }

    const data = await SubjectModel.find({campus});
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