import Account from "#account/domain/entities/account";
import { AccountInMemoryRepository } from "#account/infra/repository/db/in-memory";
import Client from "#client/domain/entities/client";
import { NotFoundError } from "#shared/errors";
import DeleteAccountUseCase from "../../delete-account.use-case";

describe("DeleteAccountUseCase Unit Tests", () => {
  let useCase: DeleteAccountUseCase.UseCase;
  let repository: AccountInMemoryRepository;

  beforeEach(() => {
    repository = new AccountInMemoryRepository();
    useCase = new DeleteAccountUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should delete a account", async () => {
    const client = new Client({
      name: "client1",
      email: "client1@email.com",
    });
    const items = [new Account({ client: client, balance: 1 })];
    repository.items = items;
    await useCase.execute({
      id: items[0].id,
    });

    expect(repository.items).toHaveLength(0);
  });
});
