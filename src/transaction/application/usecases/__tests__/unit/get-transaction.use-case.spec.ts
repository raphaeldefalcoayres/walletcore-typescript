import { NotFoundError } from "#shared/errors";
import Transaction from "#transaction/domain/entities/transaction";
import GetTransactionUseCase from "../../get-transaction.use-case";
import { TransactionInMemoryRepository } from "#transaction/infra/repository/db/in-memory";
import { TransactionFakeBuilder } from "#transaction/domain/entities/transaction-fake-builder";

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
    const fake = TransactionFakeBuilder.aTransaction().build();
    const items = [new Transaction(fake)];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await useCase.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect({
      id: output.id,
      accountFrom: output.props.accountFrom,
      accountTo: output.props.accountTo,
      amount: output.props.amount,
      created_at: output.props.created_at,
    }).toStrictEqual({
      id: repository.items[0].id,
      accountFrom: repository.items[0].accountFrom,
      accountTo: repository.items[0].accountTo,
      amount: repository.items[0].amount,
      created_at: repository.items[0].created_at,
    });
  });
});
