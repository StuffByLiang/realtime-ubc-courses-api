import express from "express";
import { Section } from "../models/section";
import CourseScraper from "../util/CourseScraper";
import sectionController from "../controllers/sectionController";

//testing
import GradeScraper from "../util/GradeScraper";

const router = express.Router();
const courseScraper = new CourseScraper();

//testing
const gradeScraper = new GradeScraper();

//any endpoints beginning with /section

router.get("/:subject/:course", sectionController.getSections);

//testing grade scraper - fuck lol
router.get(
    "/:term/:subject/:course/:section",
    sectionController.getAverageOfSection
);

export default router;
