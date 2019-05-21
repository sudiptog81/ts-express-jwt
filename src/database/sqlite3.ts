import sql, { Database } from "sqlite3";
import { Response } from "express";

type FindUserCallback = (err: Error, user: { id: number; password: string }) => Response;
type CreateUserCallback = (err: Error) => Response | undefined;

const database: Database = new sql.Database("./db.sqlite");

const createUsersTable = (): Database => database.run(`
        CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY,
        name text,
        email text UNIQUE,
        password text)
`);

const findUserByEmail = (email: string, cb: FindUserCallback): Database => database.get("SELECT * FROM users WHERE email = ?", [email], (err: Error, user: { id: number; password: string }): Response => cb(err, user));

const createUser = (user: string[], cb: CreateUserCallback): Database => database.run("INSERT INTO users (name, email, password) VALUES (?,?,?)", user, (err: Error): Response | undefined => cb(err));

export { createUsersTable, findUserByEmail, createUser };