import { TransactionFakeBuilder } from "#transaction/domain/entities/transaction-fake-builder";
import { TransactionInMemoryRepository } from "#transaction/infra/repository/db/in-memory";
import CreateTransactionUseCase from "../../create-transaction.use-case";

describe("CreateTransactionUseCase Unit Tests", () => {
  let useCase: CreateTransactionUseCase.UseCase;
  let repository: TransactionInMemoryRepository;

  beforeEach(() => {
    repository = new TransactionInMemoryRepository();
    useCase = new CreateTransactionUseCase.UseCase(repository);
  });

  it("should create a transaction", async () => {
    const spyInsert = jest.spyOn(repository, "insert");
    const fake = TransactionFakeBuilder.aTransaction().build();
    const output = await useCase.execute(fake);

    expect(spyInsert).toHaveBeenCalledTimes(1);
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
