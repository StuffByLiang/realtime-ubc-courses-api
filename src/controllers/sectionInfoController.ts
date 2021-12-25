import CourseScraper from "../util/CourseScraper";
import { SectionInfo, SectionInfoModel } from "../models";
import { getCurrentSession, updateAll } from "../util/helpers";

const courseScraper = new CourseScraper()

// localhost:3000/sectionInfo/CPSC/221/101?realtime=1 vs (realtime)
// localhost:3000/sectionInfo/CPSC/221/101               (not realtime)

/**
 *  Sends user the section Info.
 */
async function getSectionInfo(req: any, res: any) {
  const subject = req.params.subject.toUpperCase();
  const course = req.params.course.toUpperCase();
  const section = req.params.section.toUpperCase();
  const realtime = req.query.realtime; // either 1 (true) or 0/unspecified (false)

  const session = await getCurrentSession()

  try {
    const doesDataExist = await SectionInfoModel.exists({ subject, course, section, session });

    if (!doesDataExist || realtime) {
      // we scrape the website & update database in realtime if sectionInfo doesnt exist in database or realtime is true
      const sectionInfo: SectionInfo = await courseScraper.getSectionInfo(subject, course, section);

      // updates the database entry or create if doesn't exist
      await SectionInfoModel.updateOne({ subject, course, section }, {
        ...sectionInfo,
        lastUpdated: Date.now()
      }, { upsert: true });
    }

    const data = await SectionInfoModel.findOne({ subject, course, section, session });
    res.json(data);

  } catch (error) {
    res.status(404).json({
      error: error.message
    });
  }
}

async function getSectionInfoList(req: any, res: any) {
  const subject = req.params.subject.toUpperCase();
  const course = req.params.course.toUpperCase();
  const realtime = req.query.realtime; // either 1 (true) or 0/undefined/null (false)
  const session = await getCurrentSession()

  try {
    const doesDataExist = await SectionInfoModel.exists({ subject, course, session });

    if (!doesDataExist || realtime) {
      // we scrape the website in realtime if sectionInfo doesnt exist in database or realtime is true
      const sectionInfoList: Array<SectionInfo> = await courseScraper.getSectionInfoList(subject, course);

      // updates the database entry or create if doesn't exist
      await updateAll(SectionInfoModel, sectionInfoList, ["subject", "course", "section"])
    }

    const data = await SectionInfoModel.find({ subject, course, session });
    res.json(data);

  } catch (error) {
    res.status(404).json({
      error: error.message
    });
    console.error(error);
  }
}

async function getAllSectionInfoForSubject(req: any, res: any) {
  const subject = req.params.subject.toUpperCase();
  const realtime = req.query.realtime; // either 1 (true) or 0/undefined/null (false)
  const session = await getCurrentSession()

  try {
    const doesDataExist = await SectionInfoModel.exists({ subject, session });

    if (!doesDataExist || realtime) {
      // we scrape the website in realtime if sectionInfo doesnt exist in database or realtime is true
      const sectionInfoList: Array<SectionInfo> = await courseScraper.getSectionInfoListForSubject(subject);

      // updates the database entry or create if doesn't exist
      await updateAll(SectionInfoModel, sectionInfoList, ["subject", "course", "section"])
    }

    const data = await SectionInfoModel.find({ subject, session });
    res.json(data);

  } catch (error) {
    res.status(404).json({
      error: error.message
    });
    console.error(error);
  }
}

async function getAllSectionInfo(req: any, res: any) {
  const realtime = req.query.realtime; // either 1 (true) or 0/undefined/null (false)
  const session = await getCurrentSession()

  try {
    const doesDataExist = await SectionInfoModel.exists({ session });

    if (!doesDataExist || realtime) {
      // we scrape the website in realtime if sectionInfo doesnt exist in database or realtime is true
      const sectionInfoList: Array<SectionInfo> = await courseScraper.getAllSectionInfo();

      // updates the database entry or create if doesn't exist
      await updateAll(SectionInfoModel, sectionInfoList, ["subject", "course", "section"])
    }

    const data = await SectionInfoModel.find({ session });
    res.json(data);

  } catch (error) {
    res.status(404).json({
      error: error.message
    });
    console.error(error);
  }
}

export default {
  getAllSectionInfoForSubject,
  getSectionInfoList,
  getSectionInfo,
  getAllSectionInfo
}