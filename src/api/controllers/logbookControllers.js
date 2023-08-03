import LogbookModel from "../models/logbookModel.js";

export const addLogbook = async (req, res) => {
    try {
        const logbook = await LogbookModel.create(req.body);
        res.status(200).json(logbook);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
};

export const getLogbook = async (req, res) => {
    try {
        const logbook = await LogbookModel.findById(req.params.logbookId);
        if (!logbook) {
            return res.status(404).json({message: error.message});
        }
        res.status(200).json(logbook);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
};

export const delLogbook = async (req, res) => {
    try {
        const logbook = await LogbookModel.findByIdAndDelete(req.params.logbookId);
        if (!logbook) {
            return res.status(404).json({ error: "Logbook not found" });
        }
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addTaskToLogbook = async (req, res) => {
    try {
        const logbook = await LogbookModel.findById(req.params.logbookId);
        if (!logbook) {
            return res.status(404).json({ error: "Logbook not found" });
        }

        const { taskName } = req.body;
        logbook.tasks.push({ taskName });
        await logbook.save();
        res.status(200).json(logbook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTaskInLogbook = async (req, res) => {
    try {
        const logbook = await LogbookModel.findById(req.params.logbookId);
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
};

export const delTaskFromLogbook = async (req, res) => {
    try {
        const logbook = await LogbookModel.findById(req.params.logbookId);
        if (!logbook) {
            return res.status(404).json({ error: "Logbook not found"});
        }
        logbook.tasks = logbook.tasks.filter((task) => task._id.toString() !== req.params.taskId);
        await logbook.save();
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
};