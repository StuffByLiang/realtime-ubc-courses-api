import express from 'express';
import { Course } from "../models/course"
import CourseScraper from "../util/CourseScraper"
import courseController from '../controllers/courseController'

const router = express.Router();

const courseScraper = new CourseScraper()

// any endpoints beginning with /course

router.get("/", courseController.getAllCourses);
router.get("/:subject", courseController.getCourse);



// router.get("/CPSC", (req, res) => {
//   const cpsc221 : Course = {
//       name: "CPSC 221",
//       subject: "CPSC",
//       number: 221,
//       title: "Basic Algorithms and Data Structures",
//       endpoint: "/course/CPSC/221/",
//       link: "/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPSC&course=221"
//     }
//   res.json({
//     courses: [
//       cpsc221,
//     ]
//   });
// });

export default router;