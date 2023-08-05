import Course from "../models/courseModel.js";
import Logbook from "../models/logbookModel.js";

//add new course to db
export const addCourse = async (req, res) => {
    try {
        //create new model of course and save it to db
        const course = await Course.create(req.body);

        res.status(200).json(course);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

//get all courses from db
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

//get one course from db by id
export const getCourse = async (req, res) => {
    try {
        //get course from db
        const course = await Course.findById(req.params.courseID);

        //check if course exists
        if (!course) {
            return res.status(404).json({error: "Course not found"});
        }

        res.status(200).json(course);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

//delete course from db by id
export const delCourse = async (req, res) => {
    try {
        // find course in db and delete it
        const course = await Course.findByIdAndDelete(req.params.courseID);

        //check if course exists
        if (!course) {
            return res.status(404).json({ error: "Course not found." });
        }

        res.status(200).json({message: "Deleted successfully."});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

// get all tasks, which are in course
export const getTasksFromCourse = async (req, res) => {
    try {
        //get course from db
        const course = await Course.findById(req.params.courseID);

        //check if course exists
        if (!course) {
            return res.status(404).json({ error: "Course not found." });
        }

        //return tasks from course
        res.status(200).json(course.tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// get one task by task number, which is in course
export const getTaskFromCourse = async (req, res) => {
    try {
        //get course from db
        const course = await Course.findById(req.params.courseID);

        //check if course exists
        if (!course) {
            return res.status(404).json({ error: "Course not found." });
        }

        //get task, which we need and return it
        for (const task of course.tasks){
            if (task.task_no.toString() === req.params.task_no){
                return res.status(200).json(task)
            }
        }

        //response if task won't be found
        res.status(404).json({ error: "Task not found in course." });


    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

// add task to course
export const addTaskToCourse = async (req, res) => {
    try {
        //get course from db
        const course = await Course.findById(req.params.courseID);

        //check if course exists
        if (!course) {
            return res.status(404).json({error: "Course not found."});
        }

        //get new task from request
        const newTask = req.body;

        //set the next task number
        newTask.task_no = course.tasks[course.tasks.length-1].task_no+1;
        if (newTask.task_no === undefined){
            newTask.task_no = 1
        }

        //add new task to course
        course.tasks.push(newTask);

        //save changes to db
        await course.save();

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//update task in course
export const updateTaskInCourse = async (req, res) => {
    try {
        //get course from db
        const course = await Course.findById(req.params.courseID);

        //check if course exists
        if (!course) {
            return res.status(404).json({error: "Course not found."});
        }

        //get updated task from request
        const updatedTask = req.body;

        //find task in course, which we want to change
        const taskIndexInCourse = course.tasks.findIndex((task) => task.task_no.toString() === req.params.task_no);
        if (taskIndexInCourse === -1) {
            return res.status(404).json({ error: "Task not found in course." });
        }

        //update task in course
        course.tasks[taskIndexInCourse] = updatedTask;

        //save changes to db
        await course.save();

        //get all logbooks
        const logbooks = await Logbook.find();
        if (logbooks) {
            //find if any logbook is based on this course
            const logbookIndex = logbooks.findIndex((logbook) => logbook.basedOn.toString() === course.courseName.toString());
            if(logbookIndex !== -1){
                //finding task in logbook and updating it
                const logbookTaskIndex = logbooks[logbookIndex].tasks.findIndex((task) => task.task_no=== updatedTask.task_no);
                logbooks[logbookIndex].tasks[logbookTaskIndex] = updatedTask;
                await logbooks[logbookIndex].save();
            }
        }


        res.status(200).json(course);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

//delete task from course
export const delTaskFromCourse = async (req, res) => {
    try {
        //get course from db
        const course = await Course.findById(req.params.courseID);

        //check if course exists
        if (!course) {
            return res.status(404).json({error: "Course not found."});
        }

        //find task in course
        const taskIndex = course.tasks.findIndex((task) => task.task_no.toString() === req.params.task_no);
        if (taskIndex === -1) {
            return res.status(404).json({ error: "Task not found in the course." });
        }

        //deleting task from course
        course.tasks.splice(taskIndex, 1);

        //save changes to db
        await course.save();

        res.status(200).json({message: "Deleted successfully."});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
