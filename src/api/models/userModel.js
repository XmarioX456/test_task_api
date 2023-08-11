import {Schema, model} from "mongoose";

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["instructor", "trainee", "trainer"], required: true}, //only values "instructor", "trainee", "trainer"
    logbooks: [{
        logbookID: {type: String}
    }]
});

const UserModel = new model("User", userSchema);
export default UserModel;