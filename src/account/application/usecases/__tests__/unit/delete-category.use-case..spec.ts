import Client from "#client/domain/entities/client";
import { ClientInMemoryRepository } from "#client/infra/repository/db/in-memory";
import { NotFoundError } from "#shared/errors";
import DeleteClientUseCase from "../../delete-client.use-case";

describe("DeleteClientUseCase Unit Tests", () => {
  let useCase: DeleteClientUseCase.UseCase;
  let repository: ClientInMemoryRepository;

  beforeEach(() => {
    repository = new ClientInMemoryRepository();
    useCase = new DeleteClientUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should delete a client", async () => {
    const items = [new Client({ name: "test 1", email: "teste 1" })];
    repository.items = items;
    await useCase.execute({
      id: items[0].id,
    });
    expect(repository.items).toHaveLength(0);
  });
});
