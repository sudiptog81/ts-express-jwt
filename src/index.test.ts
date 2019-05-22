import app from "./index";
import supertest, { Response } from "supertest";
import { createUsersTable, dropUsersTable } from "./database/db";

let token: string, token2: string;

beforeAll((done: jest.DoneCallback): void => {
    createUsersTable();
    supertest(app).post("/api/register").send({
        name: "Awesome",
        email: "a@b.com",
        password: "password"
    }).then((response: Response): void => {
        token = "Bearer " + response.body["access_token"];
        expect(response.status).toBe(200);
        done();
    });
    supertest(app).post("/api/register").send({
        name: "Control",
        email: "c@c.com",
        password: "control"
    }).then((response: Response): void => {
        token2 = "Bearer " + response.body["access_token"];
        expect(response.status).toBe(200);
        done();
    });
});

describe("POST Endpoints", (): void => {
    test("registration endpoint", (done: jest.DoneCallback): void => {
        supertest(app).post("/api/register").send({
            name: "Awesome",
            email: "d@f.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(200);
            done();
        });
        supertest(app).post("/api/register").send({
            name: "Control2",
            email: "c2@c.com",
            password: "control2"
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
    test("login endpoint", (done: jest.DoneCallback): void => {
        supertest(app).post("/api/login").send({
            email: "a@b.com",
            password: "password"
        }).then((response: Response): void => {
            token = "Bearer " + response.body["access_token"];
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
            email: "d@fg.com",
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
        supertest(app).put("/api/update").set({
            "Authorization": token
        }).send({
            newName: "Boring",
            email: "a@b.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("update endpoint: new email", (done: jest.DoneCallback): void => {
        supertest(app).put("/api/update").set({
            "Authorization": token
        }).send({
            newEmail: "c@d.com",
            email: "a@b.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("update endpoint: missing fields", (done: jest.DoneCallback): void => {
        supertest(app).put("/api/update").set({
            "Authorization": token
        }).send({
            email: "c@d.com",
            password: "password"
        }).then((response: Response): void => {
            token = "Bearer " + response.body["access_token"];
            expect(response.status).toBe(500);
            done();
        });
    });
    test("update endpoint: wrong password", (done: jest.DoneCallback): void => {
        supertest(app).put("/api/update").set({
            "Authorization": token
        }).send({
            newEmail: "a@b.com",
            email: "c@d.com",
            password: "newpassword"
        }).then((response: Response): void => {
            expect(response.status).toBe(401);
            done();
        });
    });
    test("update endpoint: non-existent user", (done: jest.DoneCallback): void => {
        supertest(app).put("/api/update").set({
            "Authorization": token
        }).send({
            newEmail: "a@b.com",
            email: "d@fg.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(404);
            done();
        });
    });
    test("update endpoint: setting someone else's email", (done: jest.DoneCallback): void => {
        supertest(app).put("/api/update").set({
            "Authorization": token
        }).send({
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
    test("delete endpoint", (done: jest.DoneCallback): void => {
        supertest(app).delete("/api/delete").set({
            "Authorization": token
        }).send({
            email: "c@d.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("delete endpoint: wrong password", (done: jest.DoneCallback): void => {
        supertest(app).delete("/api/delete").set({
            "Authorization": token2
        }).send({
            email: "c@c.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(401);
            done();
        });
    });
    test("delete endpoint: non-existent user", (done: jest.DoneCallback): void => {
        supertest(app).delete("/api/delete").set({
            "Authorization": token
        }).send({
            email: "c@d.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(404);
            done();
        });
    });
});

describe("Front-End Application", (): void => {
    test("landing page renders", (done: jest.DoneCallback): void => {
        supertest(app).get("/").then((response: Response): void => {
            expect(response.status).toBe(200);
            expect(response.type).toBe("text/html");
            done();
        });
    });
    test("profile page reachable", (done: jest.DoneCallback): void => {
        supertest(app).get("/profile").then((response: Response): void => {
            expect(response.status).toBe(200);
            expect(response.type).toBe("text/html");
            done();
        });
    });
});

afterAll((done: jest.DoneCallback): void => {
    dropUsersTable();
    done();
});
