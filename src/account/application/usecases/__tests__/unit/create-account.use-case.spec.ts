import { AccountInMemoryRepository } from "#account/infra/repository/db/in-memory";
import Client from "#client/domain/entities/client";
import CreateAccountUseCase from "../../create-account.use-case";

describe("CreateAccountUseCase Unit Tests", () => {
  let useCase: CreateAccountUseCase.UseCase;
  let repository: AccountInMemoryRepository;

  beforeEach(() => {
    repository = new AccountInMemoryRepository();
    useCase = new CreateAccountUseCase.UseCase(repository);
  });

  const client = new Client({
    id: "1",
    name: "client1",
    email: "client1@email.com",
  });

  it("should create a account", async () => {
    const spyInsert = jest.spyOn(repository, "insert");
    let output = await useCase.execute({ client: client, balance: 1 });
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      client: client,
      balance: 1,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at,
    });

    output = await useCase.execute({
      client: client,
      balance: 1,
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].id,
      client: client,
      balance: 1,
      created_at: repository.items[1].created_at,
      updated_at: repository.items[1].updated_at,
    });
  });
});
