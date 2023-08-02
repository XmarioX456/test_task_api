import { Router } from "express";
import {
    addCourse,
    getCourse,
    delCourse,
    addTaskToCourse,
    updateTaskInCourse,
    delTaskFromCourse
} from "../controllers/coursesControllers.js";

const router = Router();

router.post("/courses", addCourse);
router.get("/courses/:courseId", getCourse);
router.delete("/courses/:courseId", delCourse);
router.post("/courses/:courseId/tasks", addTaskToCourse);
router.put("/courses/:courseId/tasks/:taskId", updateTaskInCourse);
router.delete("/courses/:courseId/tasks/:taskId", delTaskFromCourse);

export default router;