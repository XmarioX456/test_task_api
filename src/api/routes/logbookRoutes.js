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

router.post("/logbooks", addLogbook);
router.get("/logbooks", getLogbooks);
router.get("/logbooks/:logbookID", getLogbook);
router.delete("/logbooks/:logbookID", delLogbook);
router.put("/logbooks/:logbookID/tasks/:task_no", updateTaskInLogbook);
router.delete("/logbooks/:logbookID/tasks/:task_no", delTaskFromLogbook);

export default router;