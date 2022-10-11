"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../domain/entities/client");
const client_output_1 = require("./client-output");
describe("ClientOutputMapper Unit Tests", () => {
    it("should convert a client in output", () => {
        const created_at = new Date();
        const updated_at = new Date();
        const entity = new client_1.default({
            name: "Movie",
            email: "some email",
            created_at,
            updated_at,
        });
        const spyToJSON = jest.spyOn(entity, "toJSON");
        const output = client_output_1.ClientOutputMapper.toOutput(entity);
        expect(spyToJSON).toHaveBeenCalled();
        expect(output).toStrictEqual({
            id: entity.uuid,
            name: "Movie",
            email: "some email",
            created_at,
            updated_at,
        });
    });
});
