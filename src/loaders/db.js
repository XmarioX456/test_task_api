import mongoose from "mongoose";
import { dbUri } from "../config/index.js"

const connectDB = async () => {
    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
};

export default connectDB;