import mongoose from "mongoose";
const { Schema, model } = mongoose;
import TaskSchema from "./TaskSchema.js";

const CourseSchema = new Schema({
    courseName: {type: String, required: true},
    tasks: [TaskSchema]
});

const Course = model("Course", CourseSchema);
export default Course;