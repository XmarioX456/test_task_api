import { Router } from "express";
import courses from "./coursesRoutes.js";
import logbooks from "./logbookRoutes.js";

const router = Router();

router.use(courses)
router.use(logbooks)

export default router;