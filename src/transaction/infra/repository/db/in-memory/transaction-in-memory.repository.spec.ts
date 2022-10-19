import { UniqueEntityId } from "#shared/value-objects";
import { TransactionFakeBuilder } from "#transaction/domain/entities/transaction-fake-builder";
import TransactionInMemoryRepository from "./transaction-in-memory.repository";

describe("TransactionInMemoryRepository", () => {
  let repository: TransactionInMemoryRepository;

  beforeEach(() => (repository = new TransactionInMemoryRepository()));
  it("should no filter items when filter object is null", async () => {
    const items = [TransactionFakeBuilder.aTransaction().build()];
    const filterSpy = jest.spyOn(items, "filter" as any);

    let itemsFiltered = await repository["applyFilter"](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it("should filter items using filter parameter", async () => {
    const faker = TransactionFakeBuilder.aTransaction();
    const items = [
      faker
        .withUniqueEntityId(
          new UniqueEntityId("db9dd80f-836b-4a86-ae13-52a9a9986f94")
        )
        .build(),
      faker
        .withUniqueEntityId(
          new UniqueEntityId("24f6f89c-4be5-4677-87e6-de6187700854")
        )
        .build(),
      faker
        .withUniqueEntityId(
          new UniqueEntityId("35f50e8a-cd24-442d-a04e-83dfdd5c8c89")
        )
        .build(),
    ];
    const filterSpy = jest.spyOn(items, "filter" as any);

    let itemsFiltered = await repository["applyFilter"](
      items,
      "24f6f89c-4be5-4677-87e6-de6187700854"
    );
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[1]]);
  });
});
