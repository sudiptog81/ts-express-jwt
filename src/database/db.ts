import sql, { Database } from "sqlite3";
import { Response } from "express";

type FindUserCallback = (err: Error, user: {
    id: number;
    name: string;
    password: string;
    email: string;
}) => Response | undefined;
type DeleteUserCallback = (err: Error) => Response | undefined;
type UpdateUserCallback = (err: Error) => Response | undefined;
type CreateUserCallback = (err: Error) => Response | undefined;

const database: Database = new sql.Database("./db.sqlite");

const createUsersTable = (): Database => database.run(`
        CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY,
        name text,
        email text UNIQUE,
        password text)
`);

const dropUsersTable = (): Database => database.run(`
        DROP TABLE users
`);

const findUserByEmail = (email: string, cb: FindUserCallback): Database => database.get("SELECT * FROM users WHERE email = ?", [email], (err: Error, user: { id: number; name: string; password: string; email: string }): Response | undefined => cb(err, user));

const deleteUser = (id: number, cb: DeleteUserCallback): Database => database.run("DELETE FROM users WHERE id = ?", [id], (err: Error): Response | undefined => cb(err));

const updateUserEmail = (id: number, newEmail: string, cb: UpdateUserCallback): Database => database.run("UPDATE users SET email = ?1 WHERE id = ?2", { 1: newEmail, 2: id }, (err: Error): Response | undefined => cb(err));

const updateUserName = (id: number, newName: string, cb: UpdateUserCallback): Database => database.run("UPDATE users SET name = ?1 WHERE id = ?2", { 1: newName, 2: id }, (err: Error): Response | undefined => cb(err));

const createUser = (user: string[], cb: CreateUserCallback): Database => database.run("INSERT INTO users (name, email, password) VALUES (?,?,?)", user, (err: Error): Response | undefined => cb(err));

export { createUsersTable, findUserByEmail, deleteUser, createUser, updateUserEmail, updateUserName, dropUsersTable };