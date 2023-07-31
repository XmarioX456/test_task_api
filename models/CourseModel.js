const mongoose = require("mongoose");
const TaskSchema = require("./TaskSchema")

const CourseSchema = new mongoose.Schema({
    courseName: {type: String, required: true},
    tasks: [TaskSchema]
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;