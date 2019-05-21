import app from "./index";
import supertest, { Response } from "supertest";
import jest from "jest";

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
});

describe("PUT Endpoints", (): void => {
    test("update endpoint", (done: jest.DoneCallback): void => {
        supertest(app).put("/api/update").send({
            newName: "Boring",
            email: "a@b.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(200);
            done();
        });
    });
});

describe("DELETE Endpoints", (): void => {
    test("delete endpoint", (done): void => {
        supertest(app).delete("/api/delete").send({
            email: "a@b.com",
            password: "password"
        }).then((response: Response): void => {
            expect(response.status).toBe(200);
            done();
        });
    });
});
