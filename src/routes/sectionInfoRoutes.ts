import express from 'express';
import Section from "../models/section";

var router = express.Router();

//any endpoints beginning with /sectionInfo

router.get("/:subject/:number", (req, res) => {
  const subject = req.params.subject;
  const number = req.params.number;

  // TODO:

  res.json({

  });
});

router.get("/:subject/:number/:section", (req, res) => {
  const subject = req.params.subject;
  const number = req.params.number;
  const section = req.params.section;

  // TODO:

  res.json({
    
  });
});

export default router;