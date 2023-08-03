import { Schema, model } from "mongoose";
import TaskSchema from "./taskSchema.js";

const CourseSchema = new Schema({
    courseName: {type: String, required: true},
    tasks: [TaskSchema]
});

const Course = model("Course", CourseSchema);
export default Course;