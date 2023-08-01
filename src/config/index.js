import { config } from "dotenv";
config();

const { MONGODB_URI, PORT } = process.env;

export const dbUri = MONGODB_URI;
export const port = PORT;