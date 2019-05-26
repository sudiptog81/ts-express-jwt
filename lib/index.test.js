"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const supertest_1 = __importDefault(require("supertest"));
const db_1 = require("./database/db");
let token, token2;
db_1.createUsersTable();
describe("POST Endpoints", () => {
    test("registration endpoint", (done) => {
        supertest_1.default(index_1.default).post("/api/register").send({
            name: "Awesome",
            email: "a@b.com",
            password: "password"
        }).then((response) => {
            token = "Bearer " + response.body["access_token"];
            expect(response.status).toBe(200);
            done();
        });
    });
    test("registration endpoint 2", (done) => {
        supertest_1.default(index_1.default).post("/api/register").send({
            name: "Control",
            email: "s@c.com",
            password: "control"
        }).then((response) => {
            token2 = "Bearer " + response.body["access_token"];
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
            email: null,
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(500);
            done();
        });
    });
    test("login endpoint", (done) => {
        supertest_1.default(index_1.default).post("/api/login").send({
            email: "a@b.com",
            password: "password"
        }).then((response) => {
            token = "Bearer " + response.body["access_token"];
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
            email: "d@fg.com",
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
        supertest_1.default(index_1.default).put("/api/update").set({
            "Authorization": token
        }).send({
            newName: "Boring",
            email: "a@b.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("update endpoint: new email", (done) => {
        supertest_1.default(index_1.default).put("/api/update").set({
            "Authorization": token
        }).send({
            newEmail: "c@d.com",
            email: "a@b.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("update endpoint: missing fields", (done) => {
        supertest_1.default(index_1.default).put("/api/update").set({
            "Authorization": token
        }).send({
            email: "c@d.com",
            password: "password"
        }).then((response) => {
            token = "Bearer " + response.body["access_token"];
            expect(response.status).toBe(500);
            done();
        });
    });
    test("update endpoint: wrong password", (done) => {
        supertest_1.default(index_1.default).put("/api/update").set({
            "Authorization": token
        }).send({
            newEmail: "a@b.com",
            email: "c@d.com",
            password: "newpassword"
        }).then((response) => {
            expect(response.status).toBe(401);
            done();
        });
    });
    test("update endpoint: non-existent user", (done) => {
        supertest_1.default(index_1.default).put("/api/update").set({
            "Authorization": token
        }).send({
            newEmail: "a@b.com",
            email: "d@fg.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(404);
            done();
        });
    });
    test("update endpoint: setting someone else's email", (done) => {
        supertest_1.default(index_1.default).put("/api/update").set({
            "Authorization": token
        }).send({
            newEmail: "s@c.com",
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
        supertest_1.default(index_1.default).delete("/api/delete").set({
            "Authorization": token
        }).send({
            email: "c@d.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("delete endpoint: wrong password", (done) => {
        supertest_1.default(index_1.default).delete("/api/delete").set({
            "Authorization": token2
        }).send({
            email: "s@c.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(401);
            done();
        });
    });
    test("delete endpoint: non-existent user", (done) => {
        supertest_1.default(index_1.default).delete("/api/delete").set({
            "Authorization": token
        }).send({
            email: "c@d.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(404);
            done();
        });
    });
});
describe("Front-End Application", () => {
    test("landing page renders", (done) => {
        supertest_1.default(index_1.default).get("/").then((response) => {
            expect(response.status).toBe(200);
            expect(response.type).toBe("text/html");
            done();
        });
    });
    test("profile page reachable", (done) => {
        supertest_1.default(index_1.default).get("/profile").then((response) => {
            expect(response.status).toBe(200);
            expect(response.type).toBe("text/html");
            done();
        });
    });
});
afterAll((done) => {
    db_1.dropUsersTable();
    done();
});
//# sourceMappingURL=index.test.js.map