const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const connectDB = require("./db");

const Course = require("./models/CourseModel")
const Logbook = require("./models/LogbookModel")

app.use(bodyParser.json());

//connect to db
connectDB();

//init router
app.get("/", (req, res) => {
    res.send("Test task API")
});

//routers for courses
app.post("/courses", async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(200).json(course);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
});

app.get("/courses/:courseId", async (req, res) => {
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
});

app.post("/courses/:courseId/tasks", async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found." });
        }

        const { taskName } = req.body;
        course.tasks.push({ taskName });
        await course.save();
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put("/courses/:courseId/tasks/:taskId", async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found." });
        }

        const { taskName } = req.body;
        const taskIndex = course.tasks.findIndex((task) => task._id.toString() === req.params.taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ error: "Task not found in the course." });
        }

        course.tasks[taskIndex].taskName = taskName;
        await course.save();
        res.status(200).json(course);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

app.delete("/courses/:courseId/tasks/:taskId", async (req, res) => {
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
});

app.delete("/courses/:courseId", async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found." });
        }
        res.status(200).json({message: "Deleted successfully."});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//routers for logbooks
app.post("/logbooks", async (req, res) => {
    try {
        const logbook = await Logbook.create(req.body);
        res.status(200).json(logbook);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
});

app.get("/logbooks/:logbookId", async (req, res) => {
    try {
        const logbook = await Logbook.findById(req.params.logbookId);
        if (!logbook) {
            return res.status(404).json({message: error.message});
        }
        res.status(200).json(logbook);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
});

app.post("/logbooks/:logbookId/tasks", async (req, res) => {
    try {
        const logbook = await Logbook.findById(req.params.logbookId);
        if (!logbook) {
            return res.status(404).json({ error: "Logbook not found." });
        }

        const { taskName } = req.body;
        logbook.tasks.push({ taskName });
        await logbook.save();
        res.status(200).json(logbook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put("/logbooks/:logbookId/tasks/:taskId", async (req, res) => {
    try {
        const logbook = await Logbook.findById(req.params.logbookId);
        if (!logbook) {
            return res.status(404).json({error : "Logbook not found"});
        }
        const {taskName}  = req.body;
        const taskIndex = logbook.tasks.findIndex((task) => task._id.toString() === req.params.taskId);
        if (taskIndex === -1) {
            return res.status(404).json({error : "Task not found"});
        }
        logbook.tasks[taskIndex].taskName = taskName;
        await logbook.save();
        res.status(200).json(logbook);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
});

app.delete("/logbooks/:logbookId/tasks/:taskId", async (req, res) => {
    try {
        const logbook = await Logbook.findById(req.params.logbookId);
        if (!logbook) {
            return res.status(404).json({ error: "Logbook not found"});
        }
        logbook.tasks = logbook.tasks.filter((task) => task._id.toString() !== req.params.taskId);
        await logbook.save();
        res.status(200).json(logbook);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
});

app.delete("/logbooks/:logbookId", async (req, res) => {
    try {
        const logbook = await Logbook.findByIdAndDelete(req.params.logbookId);
        if (!logbook) {
            return res.status(404).json({ error: "Logbook not found." });
        }
        res.status(200).json({ message: "Deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//api start
const port = 3000;
app.listen(port, () => {
    console.log(`API running on port ${port}`);
});