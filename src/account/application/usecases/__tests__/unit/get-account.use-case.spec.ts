import { NotFoundError } from "#shared/errors";
import Account from "#account/domain/entities/account";
import GetAccountUseCase from "../../get-account.use-case";
import { AccountInMemoryRepository } from "#account/infra/repository/db/in-memory";
import Client from "#client/domain/entities/client";

describe("GetAccountUseCase Unit Tests", () => {
  let useCase: GetAccountUseCase.UseCase;
  let repository: AccountInMemoryRepository;

  beforeEach(() => {
    repository = new AccountInMemoryRepository();
    useCase = new GetAccountUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should returns a account", async () => {
    const client = new Client({
      id: "1",
      name: "client1",
      email: "client1@email.com",
    });
    const items = [new Account({ client: client, balance: 1 })];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await useCase.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].id,
      client: client,
      balance: 1,
      created_at: items[0].created_at,
      updated_at: items[0].updated_at,
    });
  });
});
