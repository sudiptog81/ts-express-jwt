import { sign } from "jsonwebtoken";
import { hash, compareSync } from "bcrypt";
import { Router, Request, Response } from "express";
import { createUser, findUserByEmail, createUsersTable } from "./../database/sqlite3";

const apiRouter: Router = Router();

createUsersTable();

apiRouter.post("/register", (req: Request, res: Response): void => {
    let { name, email, password }: { name: string; email: string; password: string } = req.body;
    hash(password, 10, (err: Error, password: string): void => {
        createUser([name, email, password], (err?: Error): Response | undefined => {
            if (err) return res.status(500).send("Server error!");
            findUserByEmail(email, (err: Error, user: { id?: number }): Response => {
                if (err) return res.status(500).send("Server error!");
                if (!user) return res.status(500).send("Server error!");
                const expiresIn = 24 * 60 * 60;
                const accessToken = sign({ id: user.id }, process.env.SECRET_SALT ? process.env.SECRET_SALT : "secret123", {
                    expiresIn
                });
                return res.json({
                    "user": user, "access_token": accessToken, "expires_in": expiresIn
                });
            });
        });
    });
});

apiRouter.post("/login", (req: Request, res: Response): void => {
    const { email, password }: { email: string; password: string } = req.body;
    findUserByEmail(email, (err: Error, user: { id: number; password: string }): Response => {
        if (err) return res.status(500).send("Server error!");
        if (!user) return res.status(404).send("User not found!");
        if (!compareSync(password, user.password)) return res.status(401).send("Password not valid!");
        const expiresIn = 24 * 60 * 60;
        const accessToken = sign({ id: user.id }, process.env.SECRET_SALT ? process.env.SECRET_SALT : "secret123", {
            expiresIn: expiresIn
        });
        return res.json({ "user": user, "access_token": accessToken, "expires_in": expiresIn });
    });
});

export default apiRouter;