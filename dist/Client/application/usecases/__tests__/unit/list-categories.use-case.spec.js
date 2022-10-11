"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../../../domain/entities/client");
const list_clients_use_case_1 = require("../../list-clients.use-case");
const client_repository_1 = require("../../../../domain/repository/client.repository");
const client_in_memory_repository_1 = require("../../../../infra/repository/db/in-memory/client-in-memory.repository");
describe("ListCategoriesUseCase Unit Tests", () => {
    let useCase;
    let repository;
    beforeEach(() => {
        repository = new client_in_memory_repository_1.default();
        useCase = new list_clients_use_case_1.default.UseCase(repository);
    });
    test("toOutput method", () => {
        let result = new client_repository_1.default.SearchResult({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null,
        });
        let output = useCase["toOutput"](result);
        expect(output).toStrictEqual({
            items: [],
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1,
        });
        const entity = new client_1.default({ name: "Name", email: "Email" });
        result = new client_repository_1.default.SearchResult({
            items: [entity],
            total: 1,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null,
        });
        output = useCase["toOutput"](result);
        expect(output).toStrictEqual({
            items: [entity.toJSON()],
            total: 1,
            current_page: 1,
            per_page: 2,
            last_page: 1,
        });
    });
    it("should returns output using empty input with categories ordered by created_at", async () => {
        const items = [
            new client_1.default({ name: "test 1", email: "test 1" }),
            new client_1.default({
                name: "test 2",
                email: "test 2",
                created_at: new Date(new Date().getTime() + 100),
            }),
        ];
        repository.items = items;
        const output = await useCase.execute({});
        expect(output).toStrictEqual({
            items: [...items].reverse().map((i) => i.toJSON()),
            total: 2,
            current_page: 1,
            per_page: 15,
            last_page: 1,
        });
    });
    it("should returns output using pagination, sort and filter", async () => {
        const items = [
            new client_1.default({ name: "a", email: "b" }),
            new client_1.default({
                name: "AAA",
                email: "BBB",
            }),
            new client_1.default({
                name: "AaA",
                email: "BbB",
            }),
            new client_1.default({
                name: "b",
                email: "b",
            }),
            new client_1.default({
                name: "c",
                email: "c",
            }),
        ];
        repository.items = items;
        let output = await useCase.execute({
            page: 1,
            per_page: 2,
            sort: "name",
            filter: "a",
        });
        expect(output).toStrictEqual({
            items: [items[1].toJSON(), items[2].toJSON()],
            total: 3,
            current_page: 1,
            per_page: 2,
            last_page: 2,
        });
        output = await useCase.execute({
            page: 2,
            per_page: 2,
            sort: "name",
            filter: "a",
        });
        expect(output).toStrictEqual({
            items: [items[0].toJSON()],
            total: 3,
            current_page: 2,
            per_page: 2,
            last_page: 2,
        });
        output = await useCase.execute({
            page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
            filter: "a",
        });
        expect(output).toStrictEqual({
            items: [items[0].toJSON(), items[2].toJSON()],
            total: 3,
            current_page: 1,
            per_page: 2,
            last_page: 2,
        });
    });
});
