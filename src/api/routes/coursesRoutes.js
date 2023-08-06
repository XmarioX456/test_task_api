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

//add course to db
router.post("/courses", addCourse);

//get all courses from db
router.get("/courses/", getCourses);

//get one course by id from db
//:courseID - id of course("_id" field in db)
router.get("/courses/:courseID", getCourse);

//delete course by id from db
//:courseID - id of course("_id" field in db)
router.delete("/courses/:courseID", delCourse);

//get all tasks linked to course
//:courseID - id of course("_id" field in db)
router.get("/courses/:courseID/tasks", getTasksFromCourse);

//get one task linked to course
//:courseID - id of course("_id" field in db)
//:task_no - task number("task_no" field in db)
router.get("/courses/:courseID/tasks/:task_no", getTaskFromCourse);

//add new task to course
//:courseID - id of course("_id" field in db)
router.post("/courses/:courseID/tasks", addTaskToCourse);

//update task in course(auto update in logbook)
//:courseID - id of course("_id" field in db)
//:task_no - task number("task_no" field in db)
router.put("/courses/:courseID/tasks/:task_no", updateTaskInCourse);

//delete task from course
//:courseID - id of course("_id" field in db)
//:task_no - task number("task_no" field in db)
router.delete("/courses/:courseID/tasks/:task_no", delTaskFromCourse);

export default router;