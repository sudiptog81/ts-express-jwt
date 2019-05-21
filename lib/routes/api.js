"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const express_1 = require("express");
const sqlite3_1 = require("./../database/sqlite3");
const apiRouter = express_1.Router();
let salt = process.env.SECRET_SALT;
sqlite3_1.createUsersTable();
apiRouter.post("/register", (req, res) => {
    let { name, email, password } = req.body;
    bcrypt_1.hash(password, 10, (err, password) => {
        sqlite3_1.createUser([name, email, password], (err) => {
            if (err)
                return res.status(500).send("Server error!");
            sqlite3_1.findUserByEmail(email, (err, user) => {
                if (err)
                    return res.status(500).send("Server error!");
                if (!user)
                    return res.status(500).send("Server error!");
                const expiresIn = 24 * 60 * 60;
                salt = salt + email;
                const accessToken = jsonwebtoken_1.sign({ id: user.id }, salt, {
                    expiresIn
                });
                return res.json({
                    "user": user, "access_token": accessToken, "expires_in": expiresIn
                });
            });
        });
    });
});
apiRouter.post("/login", (req, res) => {
    const { email, password } = req.body;
    sqlite3_1.findUserByEmail(email, (err, user) => {
        if (err)
            return res.status(500).send("Server error!");
        if (!user)
            return res.status(404).send("User not found!");
        if (!bcrypt_1.compareSync(password, user.password))
            return res.status(401).send("Password not valid!");
        const expiresIn = 24 * 60 * 60;
        salt = salt + email;
        const accessToken = jsonwebtoken_1.sign({ id: user.id }, salt, {
            expiresIn: expiresIn
        });
        return res.json({ "user": user, "access_token": accessToken, "expires_in": expiresIn });
    });
});
apiRouter.delete("/delete", (req, res) => {
    const { email, password } = req.body;
    sqlite3_1.findUserByEmail(email, (err, user) => {
        if (err)
            return res.status(500).send("Server error!");
        if (!user)
            return res.status(404).send("User not found!");
        if (!bcrypt_1.compareSync(password, user.password))
            return res.status(401).send("Password not valid!");
        const expiresIn = 24 * 60 * 60;
        salt = salt + email;
        const accessToken = jsonwebtoken_1.sign({ id: user.id }, salt, {
            expiresIn
        });
        sqlite3_1.deleteUser(user.id, (err) => {
            if (err)
                return res.status(500).send("Server error!");
            return res.json({
                "message": `User ${user.email} deleted!`,
                "access_token": accessToken,
                "expires_in": expiresIn
            });
        });
    });
});
apiRouter.put("/update", (req, res) => {
    const { email, newName, newEmail, password } = req.body;
    sqlite3_1.findUserByEmail(email, (err, user) => {
        if (err)
            return res.status(500).send("Server error!");
        if (!user)
            return res.status(404).send("User not found!");
        if (!bcrypt_1.compareSync(password, user.password))
            return res.status(401).send("Password not valid!");
        const expiresIn = 24 * 60 * 60;
        salt = salt + email;
        const accessToken = jsonwebtoken_1.sign({ id: user.id }, salt, {
            expiresIn
        });
        if (newEmail && !newName) {
            sqlite3_1.updateUserEmail(user.id, newEmail, (err) => {
                if (err)
                    return res.status(500).send("Server error!");
                user.email = newEmail;
                return res.json({
                    "user": user, "access_token": accessToken, "expires_in": expiresIn
                });
            });
        }
        else if (newName && !newEmail) {
            sqlite3_1.updateUserName(user.id, newName, (err) => {
                if (err)
                    return res.status(500).send("Server error!");
                user.name = newName;
                return res.json({
                    "user": user, "access_token": accessToken, "expires_in": expiresIn
                });
            });
        }
        else {
            res.json({
                "message": `Could not update profile for ${user.email}`, "access_token": accessToken, "expires_in": expiresIn
            });
        }
    });
});
exports.default = apiRouter;
