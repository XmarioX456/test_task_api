const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    taskID: {type: Number, required: true},
    description: {type: String, required: true},
    reference: {type: String, required: true},
    scope: {type: String},
    cat: {type:String},
    MO: {type: String},
    ET: {type: String},
    ATAchapID: {type: Number},
    topicID: {type: Number},
    section: {type: Number}
});

module.exports = TaskSchema;