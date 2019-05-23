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
const dropUsersTable = () => database.run(`
        DROP TABLE users
`);
exports.dropUsersTable = dropUsersTable;
const findUserByEmail = (email, cb) => database.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => cb(err, user));
exports.findUserByEmail = findUserByEmail;
const deleteUser = (id, cb) => database.run("DELETE FROM users WHERE id = ?", [id], (err) => cb(err));
exports.deleteUser = deleteUser;
const updateUserEmail = (id, newEmail, cb) => database.run("UPDATE users SET email = ?1 WHERE id = ?2", { 1: newEmail, 2: id }, (err) => cb(err));
exports.updateUserEmail = updateUserEmail;
const updateUserName = (id, newName, cb) => database.run("UPDATE users SET name = ?1 WHERE id = ?2", { 1: newName, 2: id }, (err) => cb(err));
exports.updateUserName = updateUserName;
const createUser = (user, cb) => database.run("INSERT INTO users (name, email, password) VALUES (?,?,?)", user, (err) => cb(err));
exports.createUser = createUser;
//# sourceMappingURL=db.js.map