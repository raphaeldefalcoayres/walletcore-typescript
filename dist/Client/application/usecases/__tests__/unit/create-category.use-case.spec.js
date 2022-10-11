"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_in_memory_repository_1 = require("../../../../infra/repository/db/in-memory/client-in-memory.repository");
const create_client_usecase_1 = require("../../create-client.usecase");
describe("CreateClientUseCase Unit Tests", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new client_in_memory_repository_1.default();
        useCase = new create_client_usecase_1.default.UseCase(repository);
    });
    it("should create a client", async () => {
        const spyInsert = jest.spyOn(repository, "insert");
        let output = await useCase.execute({ name: "test", email: "test" });
        expect(spyInsert).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: repository.items[0].id,
            name: "test",
            email: "test",
            created_at: repository.items[0].created_at,
            updated_at: repository.items[0].updated_at,
        });
        output = await useCase.execute({
            name: "test",
            email: "some email",
        });
        expect(spyInsert).toHaveBeenCalledTimes(2);
        expect(output).toStrictEqual({
            id: repository.items[1].id,
            name: "test",
            email: "some email",
            created_at: repository.items[1].created_at,
            updated_at: repository.items[1].updated_at,
        });
    });
});
