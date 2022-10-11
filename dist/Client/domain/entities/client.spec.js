"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const client_1 = require("./client");
describe("Client Unit Tests", () => {
    const arrange = {
        id: "1",
        name: "client1",
        email: "client1@email.com",
    };
    test("constructor of client", () => {
        const client = new client_1.default(arrange);
        expect(client.props).toStrictEqual(arrange);
    });
    test("constructor of client with invalid id", () => {
        const idValidateSpy = jest.spyOn(client_1.default.prototype, "idValidate");
        expect(() => new client_1.default(arrange, "1234")).toThrow("Id must be a valid UUID v4");
        expect(idValidateSpy).toHaveBeenCalled();
    });
    test("getter of id field", () => {
        const arranges = [
            { props: arrange },
            { props: arrange, id: null },
            { props: arrange, id: undefined },
            { props: arrange, id: "924251b2-bc4b-483f-9cdd-011b5da88d85" },
        ];
        arranges.forEach((item) => {
            const client = new client_1.default(item.props, item.id);
            expect(client.id).not.toBeNull();
            expect((0, uuid_1.validate)(client.id)).toBeTruthy();
        });
    });
    test("getter of name field", () => {
        const client = new client_1.default(arrange);
        expect(client.name).toBe("client1");
    });
    test("getter of email field", () => {
        const client = new client_1.default(arrange);
        expect(client.email).toBe("client1@email.com");
    });
});
