import mongoose from "mongoose";
const { Schema, model } = mongoose;
import TaskSchema from "./taskSchema.js";

const LogbookSchema = new Schema({
    logbookName: {type: String, required: true},
    basedOn: {type: String},
    trainee: {type: String},
    instructor: {type: String},
    tasks: [TaskSchema]
});

const LogbookModel = model("Logbook", LogbookSchema);
export default LogbookModel;