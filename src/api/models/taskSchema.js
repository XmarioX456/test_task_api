import {Schema} from "mongoose";

const TaskSchema = new Schema({
    task_no: { type: Number },
    description: { type: String },
    reference: { type: String },
    type: { type: String },
    cat: { type: String },
    MO: { type: String },
    ET: { type: String },
    chap: { type: String },
    top: { type: String },
    sec: { type: String },
    proj: { type: String }
});

export default TaskSchema;