import cors from "cors";
import multer, { Instance } from "multer";
import bodyParser from "body-parser";
import express, { Application } from "express";
import apiRouter from "./routes/api";

const app: Application = express();
const upload: Instance = multer({
    storage: multer.memoryStorage()
});
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;

app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.any());

app.use("/api", apiRouter);

if (process.env.NODE_ENV === "production") {
    app.listen(port, (): void => console.log(`Started on localhost:${port}`));
}

export default app;
