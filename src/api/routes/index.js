import { Router } from "express";
import courses from "./CoursesRoutes.js";
import logbooks from "./LogbookRoutes.js";

const router = Router();

router.use(courses)
router.use(logbooks)

export default router;