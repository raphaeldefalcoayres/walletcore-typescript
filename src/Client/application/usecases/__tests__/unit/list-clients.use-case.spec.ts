import { ClientRepository } from "#client/domain";

import Client from "#client/domain/entities/client";
import { ClientInMemoryRepository } from "#client/infra/repository/db/in-memory";
import ListClientsUseCase from "../../list-clients.use-case";

describe("ListClientsUseCase Unit Tests", () => {
  let useCase: ListClientsUseCase.UseCase;
  let repository: ClientInMemoryRepository;

  beforeEach(() => {
    repository = new ClientInMemoryRepository();
    useCase = new ListClientsUseCase.UseCase(repository);
  });

  test("toOutput method", () => {
    let result = new ClientRepository.SearchResult({
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

    const entity = new Client({ name: "Name", email: "Email" });
    result = new ClientRepository.SearchResult({
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

  it("should returns output using empty input with clients ordered by created_at", async () => {
    const items = [
      new Client({ name: "test 1", email: "test 1" }),
      new Client({
        name: "test 2",
        email: "test 2",
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
      new Client({ name: "a", email: "b" }),
      new Client({
        name: "AAA",
        email: "BBB",
      }),
      new Client({
        name: "AaA",
        email: "BbB",
      }),
      new Client({
        name: "b",
        email: "b",
      }),
      new Client({
        name: "c",
        email: "c",
      }),
    ];
    repository.items = items;

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[2].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: "name",
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: "desc",
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[2].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  });
});
