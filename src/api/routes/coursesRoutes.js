import { Router } from "express";
import {
    addCourse,
    getCourses,
    getCourse,
    delCourse,
    getTasksFromCourse,
    getTaskFromCourse,
    addTaskToCourse,
    updateTaskInCourse,
    delTaskFromCourse
} from "../controllers/coursesControllers.js";

const router = Router();

router.post("/courses", addCourse);
router.get("/courses/", getCourses);
router.get("/courses/:courseID", getCourse);
router.delete("/courses/:courseID", delCourse);
router.get("/courses/:courseID/tasks", getTasksFromCourse);
router.get("/courses/:courseID/tasks/:task_no", getTaskFromCourse);
router.post("/courses/:courseID/tasks", addTaskToCourse);
router.put("/courses/:courseID/tasks/:task_no", updateTaskInCourse);
router.delete("/courses/:courseID/tasks/:task_no", delTaskFromCourse);

export default router;