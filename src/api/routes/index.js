import { Router } from "express";
import courses from "./coursesRoutes.js";
import logbooks from "./logbookRoutes.js";
import users from "./usersRoutes.js";

const router = Router();

router.use(courses);
router.use(logbooks);
router.use(users);

export default router;