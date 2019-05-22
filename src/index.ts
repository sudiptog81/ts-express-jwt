import cors from "cors";
import multer, { Instance } from "multer";
import bodyParser from "body-parser";
import express, { Application } from "express";
import apiRouter from "./routes/api";

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
