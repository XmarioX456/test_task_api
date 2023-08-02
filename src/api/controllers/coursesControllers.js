import Course from "../models/courseModel.js";

export const addCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(200).json(course);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
};

export const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({error: "Course not found"});
        }
        res.status(200).json(course);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
};

export const delCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found." });
        }
        res.status(200).json({message: "Deleted successfully."});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
export const addTaskToCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({error: "Course not found."});
        }
        course.tasks.push(req.body);
        await course.save();
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const updateTaskInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found." });
        }

        const { taskName } = req.body;
        const taskIndex = course.tasks.findIndex((task) => task._id.toString() === req.params.taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ error: "Task not found in course." });
        }

        course.tasks[taskIndex].taskName = taskName;
        await course.save();
        res.status(200).json(course);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const delTaskFromCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found." });
        }

        const { taskId } = req.params;
        const taskIndex = course.tasks.findIndex((task) => task._id.toString() === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ error: "Task not found in the course." });
        }

        course.tasks.splice(taskIndex, 1);
        await course.save();
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
