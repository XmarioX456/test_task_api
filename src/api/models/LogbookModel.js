import mongoose from "mongoose";
const { Schema, model } = mongoose;
import TaskSchema from "./TaskSchema.js";

const LogbookSchema = new Schema({
    logbookName: {type: String, required: true},
    basedOn: {type: String},
    trainee: {type: String},
    instructor: {type: String},
    tasks: [TaskSchema]
});

const Logbook = model("Logbook", LogbookSchema);
export default Logbook;