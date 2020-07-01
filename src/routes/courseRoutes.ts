import express from 'express';
import Course from "../models/course"

var router = express.Router(); 

// any endpoints beginning with /course

router.get("/:subject", (req, res) => {
  const subject = req.params.subject;

  // TODO:

  res.json({
    courses: [
      // stuff goes here
    ]
  });
});

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