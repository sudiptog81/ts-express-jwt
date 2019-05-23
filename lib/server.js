"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./database/db");
const index_1 = __importDefault(require("./index"));
const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;
db_1.createUsersTable();
index_1.default.listen(port, () => console.log(`Started on localhost:${port}`));
//# sourceMappingURL=server.js.map