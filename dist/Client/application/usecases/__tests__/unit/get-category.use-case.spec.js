"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../../../shared/errors");
const client_in_memory_repository_1 = require("../../../../infra/repository/db/in-memory/client-in-memory.repository");
const get_client_use_case_1 = require("../../get-client.use-case");
const client_1 = require("../../../../domain/entities/client");
describe("GetClientUseCase Unit Tests", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new client_in_memory_repository_1.default();
        useCase = new get_client_use_case_1.GetClientUseCase.UseCase(repository);
    });
    it("should throws error when entity not found", async () => {
        await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(new errors_1.NotFoundError(`Entity Not Found using ID fake id`));
    });
    it("should returns a client", async () => {
        const items = [new client_1.default({ name: "Name", email: "Email" })];
        repository.items = items;
        const spyFindById = jest.spyOn(repository, "findById");
        const output = await useCase.execute({ id: items[0].id });
        expect(spyFindById).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: items[0].id,
            name: "Name",
            email: "Email",
            created_at: items[0].created_at,
            updated_at: items[0].updated_at,
        });
    });
});
