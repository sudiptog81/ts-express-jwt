import cors from "cors";
import { join } from "path";
import apiRouter from "./routes/api";
import viewRouter from "./routes/view";
import multer, { Instance } from "multer";
import handlebars from "express-handlebars";
import express, { Application } from "express";

const app: Application = express();
const upload: Instance = multer({
    storage: multer.memoryStorage()
});

app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.use("/", viewRouter);
app.use("/api", apiRouter);
app.use("/assets", express.static(join(__dirname, "../public")));

export default app;
