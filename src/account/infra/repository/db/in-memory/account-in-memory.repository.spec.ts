import { AccountFakeBuilder } from "#account/domain";
import Account from "#account/domain/entities/account";
import { ClientFakeBuilder } from "#client/domain";
import AccountInMemoryRepository from "./account-in-memory.repository";

describe("AccountInMemoryRepository", () => {
  let repository: AccountInMemoryRepository;

  beforeEach(() => (repository = new AccountInMemoryRepository()));
  it("should no filter items when filter object is null", async () => {
    const items = [AccountFakeBuilder.aAccount().build()];
    const filterSpy = jest.spyOn(items, "filter" as any);

    let itemsFiltered = await repository["applyFilter"](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it("should filter items using filter parameter", async () => {
    const faker = ClientFakeBuilder.aClient();
    const clients = [
      faker
        .withName("test")
        .withUUID("fbef669c-bc8d-415a-b3b9-86a28f1edbc2")
        .build(),
      faker.withName("TEST").build(),
      faker.withName("fake").build(),
    ];
    const items = [
      new Account({
        client: clients[0],
        balance: 1,
        id: "f6c28e48-8caa-406b-a283-5e091699d461",
      }),
      new Account({
        client: clients[1],
        balance: 1,
      }),
      new Account({
        client: clients[2],
        balance: 1,
      }),
    ];
    const filterSpy = jest.spyOn(items, "filter" as any);

    let itemsFiltered = await repository["applyFilter"](
      items,
      "f6c28e48-8caa-406b-a283-5e091699d461"
    );
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0]]);
  });

  it("should sort by created_at when sort param is null", async () => {
    const created_at = new Date();
    const faker = ClientFakeBuilder.aClient();
    const clients = [
      faker.withName("test").build(),
      faker.withName("TEST").build(),
      faker.withName("fake").build(),
    ];
    const items = [
      new Account({
        client: clients[0],
        balance: 1,
        created_at: created_at,
      }),
      new Account({
        client: clients[1],
        balance: 1,
        created_at: new Date(created_at.getTime() + 100),
      }),
      new Account({
        client: clients[2],
        balance: 1,
        created_at: new Date(created_at.getTime() + 200),
      }),
    ];

    let itemsSorted = await repository["applySort"](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it("should sort by client", async () => {
    const faker = ClientFakeBuilder.aClient();
    const clients = [
      faker.withName("a").build(),
      faker.withName("b").build(),
      faker.withName("c").build(),
    ];
    const items = [
      new Account({
        client: clients[0],
        balance: 1,
        created_at: new Date(Date.now() + 300),
      }),
      new Account({
        client: clients[1],
        balance: 1,
        created_at: new Date(Date.now() + 200),
      }),
      new Account({
        client: clients[2],
        balance: 1,
        created_at: new Date(Date.now() + 100),
      }),
    ];

    let itemsSorted = await repository["applySort"](items, "created_at", "asc");
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);

    itemsSorted = await repository["applySort"](items, "created_at", "desc");
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });
});
