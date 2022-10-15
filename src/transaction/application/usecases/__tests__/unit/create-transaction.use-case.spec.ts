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
    let output = await useCase.execute({});
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at,
    });

    output = await useCase.execute({});
    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].id,
      created_at: repository.items[1].created_at,
      updated_at: repository.items[1].updated_at,
    });
  });
});
