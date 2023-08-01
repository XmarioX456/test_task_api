import { Router } from "express";
import {
    addLogbook,
    getLogbook,
    delLogbook,
    addTaskToLogbook,
    updateTaskInLogbook,
    delTaskFromLogbook
} from "../controllers/LogbookControllers.js";

const router = Router();

router.post("/logbooks", addLogbook);
router.get("/logbooks/:logbookId", getLogbook);
router.delete("/logbooks/:logbookId", delLogbook);
router.post("/logbooks/:logbookId/tasks", addTaskToLogbook);
router.put("/logbooks/:logbookId/tasks/:taskId", updateTaskInLogbook);
router.delete("/logbooks/:logbookId/tasks/:taskId", delTaskFromLogbook);

export default router;