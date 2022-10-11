import Client from "../../../../domain/entities/client";
import { ClientFakeBuilder } from "../../../../domain/entities/client-fake-builder";
import ClientInMemoryRepository from "./client-in-memory.repository";

describe("ClientInMemoryRepository", () => {
  let repository: ClientInMemoryRepository;

  beforeEach(() => (repository = new ClientInMemoryRepository()));
  it("should no filter items when filter object is null", async () => {
    const items = [ClientFakeBuilder.aClient().build()];
    const filterSpy = jest.spyOn(items, "filter" as any);

    let itemsFiltered = await repository["applyFilter"](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it("should filter items using filter parameter", async () => {
    const faker = ClientFakeBuilder.aClient();
    const items = [
      faker.withName("test").build(),
      faker.withName("TEST").build(),
      faker.withName("fake").build(),
    ];
    const filterSpy = jest.spyOn(items, "filter" as any);

    let itemsFiltered = await repository["applyFilter"](items, "TEST");
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it("should sort by created_at when sort param is null", async () => {
    const created_at = new Date();
    const items = [
      new Client({
        name: "test",
        email: "test@email.com",
        created_at: created_at,
      }),
      new Client({
        name: "TEST",
        email: "test@email.com",
        created_at: new Date(created_at.getTime() + 100),
      }),
      new Client({
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
      new Client({ name: "c", email: "teste@email.com" }),
      new Client({ name: "b", email: "teste@email.com" }),
      new Client({ name: "a", email: "teste@email.com" }),
    ];

    let itemsSorted = await repository["applySort"](items, "name", "asc");
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);

    itemsSorted = await repository["applySort"](items, "name", "desc");
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });
});
