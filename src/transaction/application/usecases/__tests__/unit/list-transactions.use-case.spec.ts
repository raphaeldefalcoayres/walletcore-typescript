import { TransactionRepository } from "#transaction/domain";
import Transaction from "#transaction/domain/entities/transaction";
import { TransactionFakeBuilder } from "#transaction/domain/entities/transaction-fake-builder";
import { TransactionInMemoryRepository } from "#transaction/infra/repository/db/in-memory";
import ListTransactionUseCase from "../../list-transactions.use-case";

describe("ListTransactionUseCase Unit Tests", () => {
  let useCase: ListTransactionUseCase.UseCase;
  let repository: TransactionInMemoryRepository;

  beforeAll(() => {
    repository = new TransactionInMemoryRepository();
    useCase = new ListTransactionUseCase.UseCase(repository);
  });

  test("toOutput method", () => {
    let result = new TransactionRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });
    let output = useCase["toOutput"](result);
    expect(output).toMatchObject({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    const fake = TransactionFakeBuilder.aTransaction().build();
    const entity = new Transaction(fake);
    result = new TransactionRepository.SearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    output = useCase["toOutput"](result);
    expect(output).toMatchObject({
      items: [entity.toJSON()],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });

  it("should returns output using empty input with transactions ordered by created_at", async () => {
    const fake1 = TransactionFakeBuilder.aTransaction().build();
    const fake2 = TransactionFakeBuilder.aTransaction()
      .withCreatedAt(new Date(new Date().getTime() + 100))
      .build();
    const items = [new Transaction(fake1), new Transaction(fake2)];
    repository.items = items;

    const output = await useCase.execute({});
    expect(output).toMatchObject({
      items: [...items].reverse().map((i) => i.toJSON()),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it("should returns output using pagination, sort and filter", async () => {
    const fake1 = TransactionFakeBuilder.aTransaction().build();
    const fake2 = TransactionFakeBuilder.aTransaction().build();
    const items = [new Transaction(fake1), new Transaction(fake2)];
    repository.items = items;

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "created_at",
    });
    expect(output).toMatchObject({
      items: [items[0].toJSON(), items[1].toJSON()],
      total: 2,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: "created_at",
    });
    expect(output).toMatchObject({
      items: [],
      total: 2,
      current_page: 2,
      per_page: 2,
      last_page: 1,
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "created_at",
      sort_dir: "desc",
    });
    expect(output).toMatchObject({
      items: [items[1].toJSON(), items[0].toJSON()],
      total: 2,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });
});
