import { Router } from "express";
import {
    addUser,
    getUsers,
    getUser,
    updateUser,
    delUser,
    getLogbooksByUsers,
    addLogbookToUser,
    delLogbookFromUser
} from "../controllers/userControllers.js";

const router = Router();

//add user
router.post("/users", addUser);

//get all users
router.get("/users", getUsers);

//get user by id
//:userID - id of user("_id" field in db)
router.get("/users/:userID", getUser);

//update user
//:userID - id of user("_id" field in db)
router.put("/users/:userID", updateUser);

//delete user
//:userID - id of user("_id" field in db)
router.delete("/users/:userID", delUser);

//get all logbooks linked to user
//:userID - id of user("_id" field in db)
router.get("/users/:userID/logbooks", getLogbooksByUsers);

//link logbook to user
//:userID - id of user("_id" field in db)
router.post("/users/:userID/logbooks", addLogbookToUser);

//unlink logbook from user
//:userID - id of user("_id" field in db)
//:delLogbookID - id of logbook("_id" field from LogbookModule)
router.delete("/users/:userID/logbooks/:delLogbookID", delLogbookFromUser);

export default router;