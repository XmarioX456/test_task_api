import { Schema, model } from "mongoose";
import TaskSchema from "./taskSchema.js";
import extendSchema from "mongoose-extend-schema"

const LogbookSchema = new Schema({
    logbookName: {type: String, required: true},
    basedOn: {type: String},
    trainee: {type: String},
    instructor: {type: String},
    tasks: [extendSchema(TaskSchema,
        {
            created_at: {type: String},
            updated_at: {type: String},
            enable: {type: Boolean},
            completed: {type: String},
            sign_of: {type: String},
            lvl: {type: String},
            assess: {type: Boolean},
            traineeNotes: {type: Schema.Types.Mixed},
            trainerSharedNotes: {type: Schema.Types.Mixed},
            trainerPrivateNotes: {type: Schema.Types.Mixed},
            examinable: {type: Boolean}
        }
    )]
});

const logbookModel = model("Logbook", LogbookSchema);
export default logbookModel;
