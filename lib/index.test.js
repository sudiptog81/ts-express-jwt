"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const supertest_1 = __importDefault(require("supertest"));
const sqlite3_1 = require("./database/sqlite3");
describe("Creating Database Table", () => {
    test("created without errors", () => {
        sqlite3_1.createUsersTable();
    });
});
describe("POST Endpoints", () => {
    test("registration endpoint", (done) => {
        supertest_1.default(index_1.default).post("/api/register").send({
            name: "Awesome",
            email: "a@b.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
        supertest_1.default(index_1.default).post("/api/register").send({
            name: "Control",
            email: "c@c.com",
            password: "control"
        }).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("registration endpoint: using existing email receives 500", (done) => {
        supertest_1.default(index_1.default).post("/api/register").send({
            name: "Dope",
            email: "a@b.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(500);
            done();
        });
    });
    test("registration endpoint: missing fields in request receive 500", (done) => {
        supertest_1.default(index_1.default).post("/api/register").send({
            name: "Cool",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(500);
            done();
        });
    });
});
describe("POST Endpoints", () => {
    test("login endpoint", (done) => {
        supertest_1.default(index_1.default).post("/api/login").send({
            email: "a@b.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("login endpoint: wrong password returns 401", (done) => {
        supertest_1.default(index_1.default).post("/api/login").send({
            email: "a@b.com",
            password: "newpassword"
        }).then((response) => {
            expect(response.status).toBe(401);
            done();
        });
    });
    test("login endpoint: non-existent user returns 404", (done) => {
        supertest_1.default(index_1.default).post("/api/login").send({
            email: "d@f.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(404);
            done();
        });
    });
    test("login endpoint: missing fields in request return 500", (done) => {
        supertest_1.default(index_1.default).post("/api/login").send({
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(500);
            done();
        });
    });
});
describe("PUT Endpoints", () => {
    test("update endpoint: new name", (done) => {
        supertest_1.default(index_1.default).put("/api/update").send({
            newName: "Boring",
            email: "a@b.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("update endpoint: new email", (done) => {
        supertest_1.default(index_1.default).put("/api/update").send({
            newEmail: "c@d.com",
            email: "a@b.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("update endpoint: missing fields", (done) => {
        supertest_1.default(index_1.default).put("/api/update").send({
            email: "c@d.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(500);
            done();
        });
    });
    test("update endpoint: wrong password", (done) => {
        supertest_1.default(index_1.default).put("/api/update").send({
            newEmail: "a@b.com",
            email: "c@d.com",
            password: "newpassword"
        }).then((response) => {
            expect(response.status).toBe(401);
            done();
        });
    });
    test("update endpoint: non-existent user", (done) => {
        supertest_1.default(index_1.default).put("/api/update").send({
            newEmail: "a@b.com",
            email: "d@f.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(404);
            done();
        });
    });
    test("update endpoint: setting someone else's email", (done) => {
        supertest_1.default(index_1.default).put("/api/update").send({
            newEmail: "c@c.com",
            email: "c@d.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(500);
            done();
        });
    });
});
describe("DELETE Endpoints", () => {
    test("delete endpoint", (done) => {
        supertest_1.default(index_1.default).delete("/api/delete").send({
            email: "c@d.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("delete endpoint: wrong password", (done) => {
        supertest_1.default(index_1.default).delete("/api/delete").send({
            email: "c@c.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(401);
            done();
        });
    });
    test("delete endpoint: non-existent user", (done) => {
        supertest_1.default(index_1.default).delete("/api/delete").send({
            email: "c@d.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(404);
            done();
        });
    });
});
describe("Dropping Database Table", () => {
    test("dropped without errors", () => {
        sqlite3_1.dropUsersTable();
    });
});