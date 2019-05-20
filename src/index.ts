import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";
import express, { Application, Request, Response } from "express";

const app: Application = express();
const upload = multer({
    storage: multer.memoryStorage()
});
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8001;

app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.any());

app.get("/", (req: Request, res: Response): void => {
    res.json({ message: "Success" });
});

app.post("/post", (req: Request, res: Response): void => {
    try {
        let { id, name }: { id: number, name: string } = req.body;
        res.json({ id, name });
    } catch {
        res.json(req.body);
    }
});

app.listen(port, (): void => console.log(`Started on ${port}`));