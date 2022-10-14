import { TransactionRepository } from "#transaction/domain";

import Transaction from "#transaction/domain/entities/transaction";
import { TransactionInMemoryRepository } from "#transaction/infra/repository/db/in-memory";
import Client from "#client/domain/entities/client";
import ListCategoriesUseCase from "../../list-transactions.use-case";

describe("ListCategoriesUseCase Unit Tests", () => {
  let useCase: ListCategoriesUseCase.UseCase;
  let repository: TransactionInMemoryRepository;

  beforeEach(() => {
    repository = new TransactionInMemoryRepository();
    useCase = new ListCategoriesUseCase.UseCase(repository);
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
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    const entity = new Transaction({});
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
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });

  it("should returns output using empty input with transactions ordered by created_at", async () => {
    const items = [
      new Transaction({}),
      new Transaction({
        created_at: new Date(new Date().getTime() + 100),
      }),
    ];
    repository.items = items;

    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: [...items].reverse().map((i) => i.toJSON()),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it("should returns output using pagination, sort and filter", async () => {
    const items = [
      new Transaction({}),
      new Transaction({}),
    ];
    repository.items = items;

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "created_at",
    });
    expect(output).toStrictEqual({
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
    expect(output).toStrictEqual({
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
    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[1].toJSON()],
      total: 2,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });
});
