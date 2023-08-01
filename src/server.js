import express from "express";
import bodyParser from "body-parser";

import { port } from "./config/index.js";
import loader from "./loaders/index.js";

const app = express();
app.use(bodyParser.json());
loader(app);
app.listen(port, () => {
    console.log(`API running on port ${port}`);
});

export default app;