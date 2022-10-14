import { NotFoundError } from "#shared/errors";
import Client from "#client/domain/entities/client";
import GetClientUseCase from "../../get-client.use-case";
import { ClientInMemoryRepository } from "#client/infra/repository/db/in-memory";

describe("GetClientUseCase Unit Tests", () => {
  let useCase: GetClientUseCase.UseCase;
  let repository: ClientInMemoryRepository;

  beforeEach(() => {
    repository = new ClientInMemoryRepository();
    useCase = new GetClientUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should returns a client", async () => {
    const items = [new Client({ name: "Name", email: "Email" })];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await useCase.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].id,
      name: "Name",
      email: "Email",
      created_at: items[0].created_at,
      updated_at: items[0].updated_at,
    });
  });
});
