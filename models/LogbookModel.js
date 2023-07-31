const mongoose = require("mongoose");
const TaskSchema = require("./TaskSchema")

const LogbookSchema = new mongoose.Schema({
    logbookName: {type: String, required: true},
    basedOn: {type: String},
    trainee: {type: String},
    instructor: {type: String},
    tasks: [TaskSchema]
});

const Logbook = mongoose.model("Logbook", LogbookSchema);
module.exports = Logbook;