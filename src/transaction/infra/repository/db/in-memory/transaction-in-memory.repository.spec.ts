import { TransactionFakeBuilder } from "#transaction/domain";
import Transaction from "#transaction/domain/entities/transaction";
import { ClientFakeBuilder } from "#client/domain";
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
});
