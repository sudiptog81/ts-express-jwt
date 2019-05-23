import jwt from "express-jwt";
import { sign } from "jsonwebtoken";
import { compareSync, hashSync } from "bcrypt";
import { Router, Request, Response } from "express";
import {
    createUser,
    findUserByEmail,
    deleteUser,
    updateUserEmail,
    updateUserName,
} from "../database/db";

const apiRouter: Router = Router();

const salt: string = process.env.SECRET_SALT + (Math.random() * 10000).toString();

apiRouter.use(jwt({ secret: salt, requestProperty: "body.jwt" }).unless({
    path: [
        "/api/login",
        "/api/register"
    ]
}));

apiRouter.post("/register", (req: Request, res: Response): void => {
    let { name, email, password }: { name: string; email: string; password: string } = req.body;
    password = hashSync(password, 10);
    createUser([name, email, password], (err?: Error): Response | undefined => {
        if (err) return res.status(500).json({ "error": "Server error!" });
        findUserByEmail(email, (err: Error, user: { id: number; password: string }): Response => {
            if (err) return res.status(500).json({ "error": "Server error!" });
            if (!user) return res.status(500).json({ "error": "Server error!" });
            const expiresIn = 60;
            const accessToken = sign({ id: user.id }, salt, {
                expiresIn
            });
            delete user.password;
            return res.json({
                "user": user,
                "access_token": accessToken,
                "expires_at": (new Date().getTime() / 1000) + 60
            });
        });
    });
});

apiRouter.post("/login", (req: Request, res: Response): void => {
    const { email, password }: { email: string; password: string } = req.body;
    findUserByEmail(email, (err: Error, user: { id: number; password: string }): Response => {
        if (err) return res.status(500).json({ "error": "Server error!" });
        if (!email) return res.status(500).json({ "error": "Server error!" });
        if (!user) return res.status(404).json({ "error": "User not found!" });
        if (!compareSync(password, user.password)) return res.status(401).json({ "error": "Password not valid!" });
        const expiresIn = 60;
        const accessToken = sign({ id: user.id }, salt, {
            expiresIn
        });
        delete user.password;
        return res.json({
            "user": user,
            "access_token": accessToken,
            "expires_at": (new Date().getTime() / 1000) + 60
        });
    });
});

apiRouter.delete("/delete", (req: Request, res: Response): void => {
    const { email, password }: { email: string; password: string } = req.body;
    findUserByEmail(email, (err: Error, user: { id: number; password: string; email: string }): Response | undefined => {
        if (err) return res.status(500).json({ "error": "Server Error!" });
        if (!user) return res.status(404).json({ "error": "User not found!" });
        if (!compareSync(password, user.password)) return res.status(401).json({ "error": "Password not valid!" });
        const expiresIn = 60;
        const accessToken = sign({ id: user.id }, salt, {
            expiresIn
        });
        deleteUser(user.id, (err: Error): Response => {
            if (err) return res.status(500).json({ "error": err });
            return res.json({
                "message": `User ${user.email} deleted!`,
                "access_token": accessToken,
                "expires_at": (new Date().getTime() / 1000) + 60
            });
        });
    });
});

apiRouter.put("/update", (req: Request, res: Response): void => {
    const { email, newName, newEmail, password }: { email: string; newName?: string; newEmail?: string; password: string } = req.body;
    findUserByEmail(email, (err: Error, user: { id: number; name: string; password: string; email: string }): Response | undefined => {
        if (err) return res.status(500).json({ "error": "Server error!" });
        if (!user) return res.status(404).json({ "error": "User not found!" });
        if (!compareSync(password, user.password)) return res.status(401).json({ "error": "Password not valid!" });
        const expiresIn = 60;
        const accessToken = sign({ id: user.id }, salt, {
            expiresIn
        });
        delete user.password;
        if (newEmail && !newName) {
            updateUserEmail(user.id, newEmail, (err: Error): Response => {
                if (err) return res.status(500).json({ "error": "Server error!" });
                user.email = newEmail;
                return res.json({
                    "user": user,
                    "access_token": accessToken,
                    "expires_at": (new Date().getTime() / 1000) + 60
                });
            });
        } else if (newName && !newEmail) {
            updateUserName(user.id, newName, (err: Error): Response => {
                if (err) return res.status(500).json({ "error": "Server error!" });
                user.name = newName;
                return res.json({
                    "user": user,
                    "access_token": accessToken,
                    "expires_at": (new Date().getTime() / 1000) + 60
                });
            });
        } else {
            res.status(500).json({
                "error": `Could not update profile for ${user.email}`,
                "access_token": accessToken,
                "expires_at": (new Date().getTime() / 1000) + 60
            });
        }
    });
});

export default apiRouter;