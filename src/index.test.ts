import app from "./index";
import supertest, { Response } from "supertest";
import { createUsersTable, dropUsersTable } from "./database/sqlite3";

describe("Creating Database Table", (): void => {
    test("created without errors", (): void => {
        createUsersTable();
    });
});

describe("POST Endpoints", (): void => {
    test("registration endpoint", (done: jest.DoneCallback): void => {
        supertest(app).post("/api/register").send({
            name: "Awesome",
            email: "a@b.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(200);
            done();
        });
        supertest(app).post("/api/register").send({
            name: "Control",
            email: "c@c.com",
            password: "control"
        }).then((response: Response): void => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("registration endpoint: using existing email receives 500", (done: jest.DoneCallback): void => {
        supertest(app).post("/api/register").send({
            name: "Dope",
            email: "a@b.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(500);
            done();
        });
    });
    test("registration endpoint: missing fields in request receive 500", (done: jest.DoneCallback): void => {
        supertest(app).post("/api/register").send({
            name: "Cool",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(500);
            done();
        });
    });
});

describe("POST Endpoints", (): void => {
    test("login endpoint", (done: jest.DoneCallback): void => {
        supertest(app).post("/api/login").send({
            email: "a@b.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("login endpoint: wrong password returns 401", (done: jest.DoneCallback): void => {
        supertest(app).post("/api/login").send({
            email: "a@b.com",
            password: "newpassword"
        }).then((response: Response): void => {
            expect(response.status).toBe(401);
            done();
        });
    });
    test("login endpoint: non-existent user returns 404", (done: jest.DoneCallback): void => {
        supertest(app).post("/api/login").send({
            email: "d@f.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(404);
            done();
        });
    });
    test("login endpoint: missing fields in request return 500", (done: jest.DoneCallback): void => {
        supertest(app).post("/api/login").send({
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(500);
            done();
        });
    });
});

describe("PUT Endpoints", (): void => {
    test("update endpoint: new name", (done: jest.DoneCallback): void => {
        supertest(app).put("/api/update").send({
            newName: "Boring",
            email: "a@b.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("update endpoint: new email", (done: jest.DoneCallback): void => {
        supertest(app).put("/api/update").send({
            newEmail: "c@d.com",
            email: "a@b.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("update endpoint: missing fields", (done: jest.DoneCallback): void => {
        supertest(app).put("/api/update").send({
            email: "c@d.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(500);
            done();
        });
    });
    test("update endpoint: wrong password", (done: jest.DoneCallback): void => {
        supertest(app).put("/api/update").send({
            newEmail: "a@b.com",
            email: "c@d.com",
            password: "newpassword"
        }).then((response: Response): void => {
            expect(response.status).toBe(401);
            done();
        });
    });
    test("update endpoint: non-existent user", (done: jest.DoneCallback): void => {
        supertest(app).put("/api/update").send({
            newEmail: "a@b.com",
            email: "d@f.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(404);
            done();
        });
    });
    test("update endpoint: setting someone else's email", (done: jest.DoneCallback): void => {
        supertest(app).put("/api/update").send({
            newEmail: "c@c.com",
            email: "c@d.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(500);
            done();
        });
    });
});

describe("DELETE Endpoints", (): void => {
    test("delete endpoint", (done): void => {
        supertest(app).delete("/api/delete").send({
            email: "c@d.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("delete endpoint: wrong password", (done): void => {
        supertest(app).delete("/api/delete").send({
            email: "c@c.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(401);
            done();
        });
    });
    test("delete endpoint: non-existent user", (done): void => {
        supertest(app).delete("/api/delete").send({
            email: "c@d.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(404);
            done();
        });
    });
});

describe("Dropping Database Table", (): void => {
    test("dropped without errors", (): void => {
        dropUsersTable();
    });
});
