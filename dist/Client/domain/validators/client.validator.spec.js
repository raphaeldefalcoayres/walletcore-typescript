"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_validator_1 = require("./client.validator");
describe("ClientValidator Tests", () => {
    let validator;
    beforeEach(() => (validator = client_validator_1.default.create()));
    test("invalidation cases for name field", () => {
        expect({ validator, data: null }).containsErrorMessages({
            name: [
                "name should not be empty",
                "name must be a string",
                "name must be shorter than or equal to 255 characters",
            ],
        });
        expect({ validator, data: { name: null } }).containsErrorMessages({
            name: [
                "name should not be empty",
                "name must be a string",
                "name must be shorter than or equal to 255 characters",
            ],
        });
        expect({ validator, data: { name: "" } }).containsErrorMessages({
            name: ["name should not be empty"],
        });
        expect({ validator, data: { name: 5 } }).containsErrorMessages({
            name: [
                "name must be a string",
                "name must be shorter than or equal to 255 characters",
            ],
        });
        expect({
            validator,
            data: { name: "t".repeat(256) },
        }).containsErrorMessages({
            name: ["name must be shorter than or equal to 255 characters"],
        });
    });
    test("invalidation cases for email field", () => {
        expect({
            validator,
            data: { name: "some name", email: "" },
        }).containsErrorMessages({
            email: ["email should not be empty", "email must be a string"],
        });
        expect({
            validator,
            data: { name: "some name", email: 5 },
        }).containsErrorMessages({
            email: ["email must be a string"],
        });
    });
    describe("valid cases for fields", () => {
        const arrange = [
            {
                name: "some value",
                email: "some",
            },
        ];
        test.each(arrange)("validate %o", (item) => {
            const isValid = validator.validate(item);
            expect(isValid).toBeTruthy();
            expect(validator.validatedData).toStrictEqual(new client_validator_1.ClientRules(item));
        });
    });
});
