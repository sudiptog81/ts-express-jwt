"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const viewRouter = express_1.Router();
viewRouter.get("/", (req, res) => res.render("index", {
    year: new Date().getFullYear()
}));
viewRouter.get("/profile", (req, res) => res.render("profile"));
exports.default = viewRouter;
