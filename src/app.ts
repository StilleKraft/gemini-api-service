import express from "express";

import router from "./handler/route";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1", router);

export default app;
