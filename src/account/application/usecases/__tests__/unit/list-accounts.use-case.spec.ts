import { AccountRepository } from "#account/domain";

import Account from "#account/domain/entities/account";
import { AccountInMemoryRepository } from "#account/infra/repository/db/in-memory";
import Client from "#client/domain/entities/client";
import ListAccountsUseCase from "../../list-accounts.use-case";

describe("ListAccountsUseCase Unit Tests", () => {
  let useCase: ListAccountsUseCase.UseCase;
  let repository: AccountInMemoryRepository;

  beforeEach(() => {
    repository = new AccountInMemoryRepository();
    useCase = new ListAccountsUseCase.UseCase(repository);
  });

  test("toOutput method", () => {
    let result = new AccountRepository.SearchResult({
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

    const client = new Client({
      id: "1",
      name: "client1",
      email: "client1@email.com",
    });
    const entity = new Account({ client: client, balance: 1 });
    result = new AccountRepository.SearchResult({
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

  it("should returns output using empty input with accounts ordered by created_at", async () => {
    const client1 = new Client({
      id: "1",
      name: "client1",
      email: "client1@email.com",
    });
    const client2 = new Client({
      id: "2",
      name: "client2",
      email: "client2@email.com",
    });
    const items = [
      new Account({ client: client1, balance: 1 }),
      new Account({
        client: client2,
        balance: 1,
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
    const client1 = new Client({
      id: "1",
      name: "client1",
      email: "client1@email.com",
    });
    const client2 = new Client({
      id: "2",
      name: "client2",
      email: "client2@email.com",
    });
    const items = [
      new Account({ client: client1, balance: 1 }),
      new Account({ client: client2, balance: 2 }),
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
