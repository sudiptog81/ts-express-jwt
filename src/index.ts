import cors from "cors";
import bodyParser from "body-parser";
import apiRouter from "./routes/api";
import multer, { Instance } from "multer";
import express, { Application } from "express";

const app: Application = express();
const upload: Instance = multer({
    storage: multer.memoryStorage()
});

app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.any());

app.use("/api", apiRouter);

export default app;
