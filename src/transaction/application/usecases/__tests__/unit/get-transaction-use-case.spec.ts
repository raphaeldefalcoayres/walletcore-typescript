import { NotFoundError } from "#shared/errors";
import Transaction from "#transaction/domain/entities/transaction";
import GetTransactionUseCase from "../../get-transaction.use-case";
import { TransactionInMemoryRepository } from "#transaction/infra/repository/db/in-memory";
import Client from "#client/domain/entities/client";

describe("GetTransactionUseCase Unit Tests", () => {
  let useCase: GetTransactionUseCase.UseCase;
  let repository: TransactionInMemoryRepository;

  beforeEach(() => {
    repository = new TransactionInMemoryRepository();
    useCase = new GetTransactionUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should returns a transaction", async () => {
    const items = [new Transaction({})];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await useCase.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].id,
      created_at: items[0].created_at,
      updated_at: items[0].updated_at,
    });
  });
});
