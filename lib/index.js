"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const api_1 = __importDefault(require("./routes/api"));
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const upload = multer_1.default({
    storage: multer_1.default.memoryStorage()
});
app.options("*", cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(upload.any());
app.use("/api", api_1.default);
exports.default = app;
