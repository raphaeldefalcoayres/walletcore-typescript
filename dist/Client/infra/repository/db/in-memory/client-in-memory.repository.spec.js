"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../../../domain/entities/client");
const client_fake_builder_1 = require("../../../../domain/entities/client-fake-builder");
const client_in_memory_repository_1 = require("./client-in-memory.repository");
describe("ClientInMemoryRepository", () => {
    let repository;
    beforeEach(() => (repository = new client_in_memory_repository_1.default()));
    it("should no filter items when filter object is null", async () => {
        const items = [client_fake_builder_1.ClientFakeBuilder.aClient().build()];
        const filterSpy = jest.spyOn(items, "filter");
        let itemsFiltered = await repository["applyFilter"](items, null);
        expect(filterSpy).not.toHaveBeenCalled();
        expect(itemsFiltered).toStrictEqual(items);
    });
    it("should filter items using filter parameter", async () => {
        const faker = client_fake_builder_1.ClientFakeBuilder.aClient();
        const items = [
            faker.withName("test").build(),
            faker.withName("TEST").build(),
            faker.withName("fake").build(),
        ];
        const filterSpy = jest.spyOn(items, "filter");
        let itemsFiltered = await repository["applyFilter"](items, "TEST");
        expect(filterSpy).toHaveBeenCalledTimes(1);
        expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
    });
    it("should sort by created_at when sort param is null", async () => {
        const created_at = new Date();
        const items = [
            new client_1.default({
                name: "test",
                email: "test@email.com",
                created_at: created_at,
            }),
            new client_1.default({
                name: "TEST",
                email: "test@email.com",
                created_at: new Date(created_at.getTime() + 100),
            }),
            new client_1.default({
                name: "fake",
                email: "test@email.com",
                created_at: new Date(created_at.getTime() + 200),
            }),
        ];
        let itemsSorted = await repository["applySort"](items, null, null);
        expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
    });
    it("should sort by name", async () => {
        const items = [
            new client_1.default({ name: "c", email: "teste@email.com" }),
            new client_1.default({ name: "b", email: "teste@email.com" }),
            new client_1.default({ name: "a", email: "teste@email.com" }),
        ];
        let itemsSorted = await repository["applySort"](items, "name", "asc");
        expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
        itemsSorted = await repository["applySort"](items, "name", "desc");
        expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
    });
});
