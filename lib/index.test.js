"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const supertest_1 = __importDefault(require("supertest"));
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
});
describe("PUT Endpoints", () => {
    test("update endpoint", (done) => {
        supertest_1.default(index_1.default).put("/api/update").send({
            newName: "Boring",
            email: "a@b.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
});
describe("DELETE Endpoints", () => {
    test("delete endpoint", (done) => {
        supertest_1.default(index_1.default).delete("/api/delete").send({
            email: "a@b.com",
            password: "password"
        }).then((response) => {
            expect(response.status).toBe(200);
            done();
        });
    });
});
