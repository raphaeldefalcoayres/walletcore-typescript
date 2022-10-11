"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_client_use_case_1 = require("../../delete-client.use-case");
const errors_1 = require("../../../../../shared/errors");
const client_1 = require("../../../../domain/entities/client");
const client_in_memory_repository_1 = require("../../../../infra/repository/db/in-memory/client-in-memory.repository");
describe("DeleteClientUseCase Unit Tests", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new client_in_memory_repository_1.default();
        useCase = new delete_client_use_case_1.DeleteClientUseCase.UseCase(repository);
    });
    it("should throws error when entity not found", async () => {
        await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(new errors_1.NotFoundError(`Entity Not Found using ID fake id`));
    });
    it("should delete a client", async () => {
        const items = [new client_1.default({ name: "test 1", email: "teste 1" })];
        repository.items = items;
        await useCase.execute({
            id: items[0].id,
        });
        expect(repository.items).toHaveLength(0);
    });
});
