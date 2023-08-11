import logbookModel from "../models/logbookModel.js";
import courseModel from "../models/courseModel.js";

//add new logbook to db
export const addLogbook = async (req, res) => {
    try {
        //create model and write it to db
        const logbook = await logbookModel.create(req.body);

        //get all courses
        const courses = await courseModel.find();

        //check if any courses exists
        if (!courses){
            return res.status(404).json({ error: "Courses not found" });
        }

        //adding all task from course to logbook
        for (const course of courses){
            if (course.courseName === logbook.basedOn){
                for (const task of course.tasks) {
                    delete task._id;
                    logbook.tasks.push(task);
                    await logbook.save();
                }
            }
        }


        res.status(200).json(logbook);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

//get all logbooks from db
export const getLogbooks = async (req, res) =>{
    try {
        const logbooks = await logbookModel.find();
        res.status(200).json(logbooks);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

//get one logbook by from db
export const getLogbook = async (req, res) => {
    try {
        //get one logbook by id from db
        const logbook = await logbookModel.findById(req.params.logbookID);

        //check if logbook isn't in db
        if (!logbook) {
            return res.status(404).json({ error: "Logbook not found." });
        }


        res.status(200).json(logbook);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

//delete logbook from db
export const delLogbook = async (req, res) => {
    try {
        //get logbook from db and delete from db
        const logbook = await logbookModel.findByIdAndDelete(req.params.logbookID);

        //check if logbook isn't in db
        if (!logbook) {
            return res.status(404).json({ error: "Logbook not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// get all tasks, which are in logbook
export const getTasksFromLogbook = async (req, res) => {
    try {
        //get logbook from db
        const logbook = await logbookModel.findById(req.params.logbookID);

        //check if logbook exists
        if (!logbook) {
            return res.status(404).json({ error: "Logbook not found." });
        }

        //return tasks from logbook
        res.status(200).json(logbook.tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// get one task by task number, which is in logbook
export const getTaskFromLogbook = async (req, res) => {
    try {
        //get logbook from db
        const logbook = await logbookModel.findById(req.params.logbookID);

        //check if logbook exists
        if (!logbook) {
            return res.status(404).json({ error: "Logbook not found." });
        }

        //get task, which we need and return it
        for (const task of logbook.tasks){
            if (task.task_no.toString() === req.params.task_no){
                return res.status(200).json(task)
            }
        }

        //response if task won't be found
        res.status(404).json({ error: "Task not found in logbook." });


    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

//update task in logbook in db
export const updateTaskInLogbook = async (req, res) => {
    try {
        //get logbook from db
        const logbook = await logbookModel.findById(req.params.logbookID);

        //check if logbook isn't in db
        if (!logbook) {
            return res.status(404).json({error : "Logbook not found"});
        }

        //get updated task from request
        const updatedTask  = req.body;

        //get index of task, which we want to update
        const taskIndex = logbook.tasks.findIndex((task) => task.task_no.toString() === req.params.task_no);

        //check if task isn't in logbook
        if (taskIndex === -1) {
            return res.status(404).json({error : "Task not found"});
        }

        //update task in db
        logbook.tasks[taskIndex] = updatedTask;
        await logbook.save();

        res.status(200).json(logbook);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
};

//delete task in logbook in db
export const delTaskFromLogbook = async (req, res) => {
    try {
        //get logbook from db
        const logbook = await logbookModel.findById(req.params.logbookID);

        //check if logbook isn't in db
        if (!logbook) {
            return res.status(404).json({ error: "Logbook not found. "});
        }

        //get index of task, which we want to delete
        const taskIndex = logbook.tasks.findIndex((task) => task.task_no.toString() === req.params.task_no);

        //check if task isn't in logbook
        if (taskIndex === -1) {
            return res.status(404).json({ error: "Task not found in the logbook." });
        }

        //delete task from logbook
        logbook.tasks.splice(taskIndex, 1);

        //save changes to db
        await logbook.save();
      
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
};