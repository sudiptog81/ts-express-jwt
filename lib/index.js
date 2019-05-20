"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const upload = multer_1.default({
    storage: multer_1.default.memoryStorage()
});
const port = process.env.PORT ? parseInt(process.env.PORT) : 8001;
app.options("*", cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(upload.any());
app.get("/", (req, res) => {
    res.json({ message: "Success" });
});
app.post("/post", (req, res) => {
    try {
        let { id, name } = req.body;
        res.json({ id, name });
    }
    catch (_a) {
        res.json(req.body);
    }
});
app.listen(port, () => console.log(`Started on ${port}`));
