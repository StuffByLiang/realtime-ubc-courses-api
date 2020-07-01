import express from 'express';
import Section from "../models/section";

var router = express.Router();

//any endpoints beginning with /section

router.get("/:subject/:number", (req, res) => {
  const subject = req.params.subject;
  const number = req.params.number;

  // TODO:

  res.json({
    
  });
});

router.get('/CPSC/221', (req, res) => {
  const lectSection1: Section = {
    section_name: "101",
    status: "Full",
    endpoint: "/course/CPSC/221/101",
    link: "/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=221&section=101"
  }
  res.json({
    sections: [
      lectSection1
    ]
  })
});

export default router;