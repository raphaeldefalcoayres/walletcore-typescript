import { NotFoundError } from "#shared/errors";
import Client from "#client/domain/entities/client";
import UpdateClientUseCase from "../../update-clients.use-case";
import { ClientInMemoryRepository } from "#client/infra/repository/db/in-memory";
import { UniqueEntityId } from "#shared/value-objects";

describe("UpdateClientUseCase Unit Tests", () => {
  let useCase: UpdateClientUseCase.UseCase;
  let repository: ClientInMemoryRepository;

  beforeEach(() => {
    repository = new ClientInMemoryRepository();
    useCase = new UpdateClientUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() =>
      useCase.execute({ id: "fake id", name: "fake", email: "fake email" })
    ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
  });

  it("should update a client", async () => {
    const spyUpdate = jest.spyOn(repository, "update");
    const entity = new Client({ name: "Name", email: "Email" });
    repository.items = [entity];

    let output = await useCase.execute({
      id: entity.id,
      name: "test",
      email: "test",
    });
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      email: "test",
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });

    type Arrange = {
      input: {
        id: UniqueEntityId;
        name: string;
        email: string;
      };
      expected: {
        id: UniqueEntityId;
        name: string;
        email: string;
        created_at: Date;
        updated_at: Date;
      };
    };
    const arrange: Arrange[] = [
      {
        input: {
          id: entity.id,
          name: "test",
          email: "some email",
        },
        expected: {
          id: entity.id,
          name: "test",
          email: "some email",
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.id,
          name: "test",
          email: "test",
        },
        expected: {
          id: entity.id,
          name: "test",
          email: "test",
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.id,
          name: "test",
          email: "test",
        },
        expected: {
          id: entity.id,
          name: "test",
          email: "test",
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.id,
          name: "test",
          email: "test",
        },
        expected: {
          id: entity.id,
          name: "test",
          email: "test",
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.id,
          name: "test",
          email: "test",
        },
        expected: {
          id: entity.id,
          name: "test",
          email: "test",
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.id,
          name: "test",
          email: "some email",
        },
        expected: {
          id: entity.id,
          name: "test",
          email: "some email",
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
    ];

    for (const i of arrange) {
      output = await useCase.execute({
        id: i.input.id,
        name: i.input.name,
        email: i.input.email,
      });
      expect(output).toStrictEqual({
        id: entity.id,
        name: i.expected.name,
        email: i.expected.email,
        created_at: i.expected.created_at,
        updated_at: i.expected.updated_at,
      });
    }
  });
});
