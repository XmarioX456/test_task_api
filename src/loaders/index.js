import connectDB from './db.js';
import expressLoader from './express.js';

export default async (app) => {
    await connectDB();
    expressLoader(app);
}