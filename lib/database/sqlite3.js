"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const database = new sqlite3_1.default.Database("./db.sqlite");
const createUsersTable = () => database.run(`
        CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY,
        name text,
        email text UNIQUE,
        password text)
`);
exports.createUsersTable = createUsersTable;
const findUserByEmail = (email, cb) => database.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => cb(err, user));
exports.findUserByEmail = findUserByEmail;
const createUser = (user, cb) => database.run("INSERT INTO users (name, email, password) VALUES (?,?,?)", user, (err) => cb(err));
exports.createUser = createUser;
