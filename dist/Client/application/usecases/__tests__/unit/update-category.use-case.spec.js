"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_clients_use_case_1 = require("../../update-clients.use-case");
const client_1 = require("../../../../domain/entities/client");
const client_in_memory_repository_1 = require("../../../../infra/repository/db/in-memory/client-in-memory.repository");
const errors_1 = require("../../../../../shared/errors");
describe("UpdateClientUseCase Unit Tests", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new client_in_memory_repository_1.default();
        useCase = new update_clients_use_case_1.default.UseCase(repository);
    });
    it("should throws error when entity not found", async () => {
        await expect(() => useCase.execute({ id: "fake id", name: "fake", email: "fake email" })).rejects.toThrow(new errors_1.NotFoundError(`Entity Not Found using ID fake id`));
    });
    it("should update a client", async () => {
        const spyUpdate = jest.spyOn(repository, "update");
        const entity = new client_1.default({ name: "Name", email: "Email" });
        repository.items = [entity];
        let output = await useCase.execute({
            id: entity.id,
            name: "test",
            email: "test",
        });
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: entity.id,
            name: "test",
            email: "test",
            created_at: entity.created_at,
            updated_at: entity.updated_at,
        });
        const arrange = [
            {
                input: {
                    id: entity.id,
                    name: "test",
                    email: "some email",
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    email: "some email",
                    created_at: entity.created_at,
                    updated_at: entity.updated_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: "test",
                    email: "test",
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    email: "test",
                    created_at: entity.created_at,
                    updated_at: entity.updated_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: "test",
                    email: "test",
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    email: "test",
                    created_at: entity.created_at,
                    updated_at: entity.updated_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: "test",
                    email: "test",
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    email: "test",
                    created_at: entity.created_at,
                    updated_at: entity.updated_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: "test",
                    email: "test",
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    email: "test",
                    created_at: entity.created_at,
                    updated_at: entity.updated_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: "test",
                    email: "some email",
                },
                expected: {
                    id: entity.id,
                    name: "test",
                    email: "some email",
                    created_at: entity.created_at,
                    updated_at: entity.updated_at,
                },
            },
        ];
        for (const i of arrange) {
            output = await useCase.execute({
                id: i.input.id,
                name: i.input.name,
                email: i.input.email,
            });
            expect(output).toStrictEqual({
                id: entity.id,
                name: i.expected.name,
                email: i.expected.email,
                created_at: i.expected.created_at,
                updated_at: i.expected.updated_at,
            });
        }
    });
});
