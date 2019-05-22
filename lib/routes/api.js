"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = __importDefault(require("express-jwt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const express_1 = require("express");
const db_1 = require("../database/db");
const apiRouter = express_1.Router();
const salt = process.env.SECRET_SALT + (Math.random() * 10000).toString();
apiRouter.use(express_jwt_1.default({ secret: salt }).unless({
    path: [
        "/api/login",
        "/api/register"
    ]
}));
apiRouter.post("/register", (req, res) => {
    let { name, email, password } = req.body;
    bcrypt_1.hash(password, 10, (err, password) => {
        db_1.createUser([name, email, password], (err) => {
            if (err)
                return res.status(500).json({ "error": "Server error!" });
            db_1.findUserByEmail(email, (err, user) => {
                if (err)
                    return res.status(500).json({ "error": "Server error!" });
                if (!user)
                    return res.status(500).json({ "error": "Server error!" });
                const expiresIn = 60;
                const accessToken = jsonwebtoken_1.sign({ id: user.id }, salt, {
                    expiresIn
                });
                delete user.password;
                return res.json({
                    "user": user,
                    "access_token": accessToken,
                    "expires_in": expiresIn
                });
            });
        });
    });
});
apiRouter.post("/login", (req, res) => {
    const { email, password } = req.body;
    db_1.findUserByEmail(email, (err, user) => {
        if (err)
            return res.status(500).json({ "error": "Server error!" });
        if (!email)
            return res.status(500).json({ "error": "Server error!" });
        if (!user)
            return res.status(404).json({ "error": "User not found!" });
        if (!bcrypt_1.compareSync(password, user.password))
            return res.status(401).json({ "error": "Password not valid!" });
        const expiresIn = 60;
        const accessToken = jsonwebtoken_1.sign({ id: user.id }, salt, {
            expiresIn
        });
        delete user.password;
        return res.json({
            "user": user,
            "access_token": accessToken,
            "expires_in": expiresIn
        });
    });
});
apiRouter.delete("/delete", (req, res) => {
    const { email, password } = req.body;
    db_1.findUserByEmail(email, (err, user) => {
        if (err)
            return res.status(500).json({ "error": err });
        if (!user)
            return res.status(404).json({ "error": "User not found!" });
        if (!bcrypt_1.compareSync(password, user.password))
            return res.status(401).json({ "error": "Password not valid!" });
        const expiresIn = 60;
        const accessToken = jsonwebtoken_1.sign({ id: user.id }, salt, {
            expiresIn
        });
        db_1.deleteUser(user.id, (err) => {
            if (err)
                return res.status(500).json({ "error": err });
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
    db_1.findUserByEmail(email, (err, user) => {
        if (err)
            return res.status(500).json({ "error": "Server error!" });
        if (!user)
            return res.status(404).json({ "error": "User not found!" });
        if (!bcrypt_1.compareSync(password, user.password))
            return res.status(401).json({ "error": "Password not valid!" });
        const expiresIn = 60;
        const accessToken = jsonwebtoken_1.sign({ id: user.id }, salt, {
            expiresIn
        });
        delete user.password;
        if (newEmail && !newName) {
            db_1.updateUserEmail(user.id, newEmail, (err) => {
                if (err)
                    return res.status(500).json({ "error": "Server error!" });
                user.email = newEmail;
                return res.json({
                    "user": user,
                    "access_token": accessToken,
                    "expires_in": expiresIn
                });
            });
        }
        else if (newName && !newEmail) {
            db_1.updateUserName(user.id, newName, (err) => {
                if (err)
                    return res.status(500).json({ "error": "Server error!" });
                user.name = newName;
                return res.json({
                    "user": user,
                    "access_token": accessToken,
                    "expires_in": expiresIn
                });
            });
        }
        else {
            res.status(500).json({
                "error": `Could not update profile for ${user.email}`,
                "access_token": accessToken,
                "expires_in": expiresIn
            });
        }
    });
});
exports.default = apiRouter;
