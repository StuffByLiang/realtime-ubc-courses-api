import express from 'express';
import subjectController from "../controllers/subjectController"

const router = express.Router();

router.get("/", subjectController.getSubjects);

export default router; 