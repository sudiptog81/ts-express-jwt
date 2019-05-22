import { sign } from "jsonwebtoken";
import { hash, compareSync } from "bcrypt";
import { Router, Request, Response } from "express";
import {
    createUser,
    findUserByEmail,
    deleteUser,
    updateUserEmail,
    updateUserName,
} from "./../database/sqlite3";

const apiRouter: Router = Router();
let salt: string | undefined = process.env.SECRET_SALT;

apiRouter.post("/register", (req: Request, res: Response): void => {
    let { name, email, password }: { name: string; email: string; password: string } = req.body;
    hash(password, 10, (err: Error, password: string): void => {
        createUser([name, email, password], (err?: Error): Response | undefined => {
            if (err) return res.status(500).send("Server error!");
            findUserByEmail(email, (err: Error, user: { id?: number }): Response => {
                if (err) return res.status(500).send("Server error!");
                if (!user) return res.status(500).send("Server error!");
                const expiresIn = 24 * 60 * 60;
                salt = salt + email;
                const accessToken = sign({ id: user.id }, salt, {
                    expiresIn
                });
                return res.json({
                    "user": user,
                    "access_token": accessToken,
                    "expires_in": expiresIn
                });
            });
        });
    });
});

apiRouter.post("/login", (req: Request, res: Response): void => {
    const { email, password }: { email: string; password: string } = req.body;
    findUserByEmail(email, (err: Error, user: { id: number; password: string }): Response => {
        if (err) return res.status(500).send("Server error!");
        if (!email) return res.status(500).send("Server error!");
        if (!user) return res.status(404).send("User not found!");
        if (!compareSync(password, user.password)) return res.status(401).send("Password not valid!");
        const expiresIn = 24 * 60 * 60;
        salt = salt + email;
        const accessToken = sign({ id: user.id }, salt, {
            expiresIn
        });
        return res.json({
            "user": user,
            "access_token": accessToken,
            "expires_in": expiresIn
        });
    });
});

apiRouter.delete("/delete", (req: Request, res: Response): void => {
    const { email, password }: { email: string; password: string } = req.body;
    findUserByEmail(email, (err: Error, user: { id: number; password: string; email: string }): Response | undefined => {
        if (err) return res.status(500).send("Server error!");
        if (!user) return res.status(404).send("User not found!");
        if (!compareSync(password, user.password)) return res.status(401).send("Password not valid!");
        const expiresIn = 24 * 60 * 60;
        salt = salt + email;
        const accessToken = sign({ id: user.id }, salt, {
            expiresIn
        });
        deleteUser(user.id, (err: Error): Response => {
            if (err) return res.status(500).send("Server error!");
            return res.json({
                "message": `User ${user.email} deleted!`,
                "access_token": accessToken,
                "expires_in": expiresIn
            });
        });
    });
});

apiRouter.put("/update", (req: Request, res: Response): void => {
    const { email, newName, newEmail, password }: { email: string; newName?: string; newEmail?: string; password: string } = req.body;
    findUserByEmail(email, (err: Error, user: { id: number; name: string; password: string; email: string }): Response | undefined => {
        if (err) return res.status(500).send("Server error!");
        if (!user) return res.status(404).send("User not found!");
        if (!compareSync(password, user.password)) return res.status(401).send("Password not valid!");
        const expiresIn = 24 * 60 * 60;
        salt = salt + email;
        const accessToken = sign({ id: user.id }, salt, {
            expiresIn
        });
        if (newEmail && !newName) {
            updateUserEmail(user.id, newEmail, (err: Error): Response => {
                if (err) return res.status(500).send("Server error!");
                user.email = newEmail;
                return res.json({
                    "user": user,
                    "access_token": accessToken,
                    "expires_in": expiresIn
                });
            });
        } else if (newName && !newEmail) {
            updateUserName(user.id, newName, (err: Error): Response => {
                if (err) return res.status(500).send("Server error!");
                user.name = newName;
                return res.json({
                    "user": user,
                    "access_token": accessToken,
                    "expires_in": expiresIn
                });
            });
        } else {
            res.status(500).json({
                "message": `Could not update profile for ${user.email}`,
                "access_token": accessToken,
                "expires_in": expiresIn
            });
        }
    });
});

export default apiRouter;