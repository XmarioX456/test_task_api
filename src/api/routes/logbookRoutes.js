import { Router } from "express";
import {
    addLogbook,
    getLogbook,
    getLogbooks,
    delLogbook,
    updateTaskInLogbook,
    delTaskFromLogbook
} from "../controllers/logbookControllers.js";

const router = Router();

//add logbook to db
router.post("/logbooks", addLogbook);

//get all logbooks from db
router.get("/logbooks", getLogbooks);

//get one logbook by id from db
//:logbookID - id of logbook("_id" field in db)
router.get("/logbooks/:logbookID", getLogbook);

//delete logbook by id from db
//:logbookID - id of logbook("_id" field in db)
router.delete("/logbooks/:logbookID", delLogbook);

//update task in logbook
//:logbookID - id of logbook("_id" field in db)
//:task_no - task number("task_no" field in db)
router.put("/logbooks/:logbookID/tasks/:task_no", updateTaskInLogbook);

//delete task from logbook
//:logbookID - id of logbook("_id" field in db)
//:task_no - task number("task_no" field in db)
router.delete("/logbooks/:logbookID/tasks/:task_no", delTaskFromLogbook);

export default router;