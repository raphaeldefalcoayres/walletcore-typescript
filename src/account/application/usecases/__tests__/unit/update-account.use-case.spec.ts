import { NotFoundError } from "#shared/errors";
import Account from "#account/domain/entities/account";
import UpdateAccountUseCase from "../../update-accounts.use-case";
import { AccountInMemoryRepository } from "#account/infra/repository/db/in-memory";
import Client from "#client/domain/entities/client";
import { v4 as uuid } from "uuid";

describe("UpdateAccountUseCase Unit Tests", () => {
  let useCase: UpdateAccountUseCase.UseCase;
  let repository: AccountInMemoryRepository;

  beforeEach(() => {
    repository = new AccountInMemoryRepository();
    useCase = new UpdateAccountUseCase.UseCase(repository);
  });

  const client = new Client({
    id: uuid(),
    name: "client1",
    email: "client1@email.com",
  });

  it("should throws error when entity not found", async () => {
    await expect(() =>
      useCase.execute({ id: "fake id", client: client, balance: 1 })
    ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
  });

  it("should update a account", async () => {
    const spyUpdate = jest.spyOn(repository, "update");
    const entity = new Account({ client: client, balance: 1 });
    repository.items = [entity];

    let output = await useCase.execute({
      id: entity.id,
      client: client,
      balance: 1,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.id,
      client: client,
      balance: 1,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });

    type Arrange = {
      input: {
        id: string;
        client: Client;
        balance: number;
      };
      expected: {
        id: string;
        client: Client;
        balance: number;
        created_at: Date;
        updated_at: Date;
      };
    };
    const arrange: Arrange[] = [
      {
        input: {
          id: entity.id,
          client: client,
          balance: 1,
        },
        expected: {
          id: entity.id,
          client: client,
          balance: 1,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.id,
          client: client,
          balance: 1,
        },
        expected: {
          id: entity.id,
          client: client,
          balance: 1,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.id,
          client: client,
          balance: 1,
        },
        expected: {
          id: entity.id,
          client: client,
          balance: 1,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.id,
          client: client,
          balance: 1,
        },
        expected: {
          id: entity.id,
          client: client,
          balance: 1,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.id,
          client: client,
          balance: 1,
        },
        expected: {
          id: entity.id,
          client: client,
          balance: 1,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.id,
          client: client,
          balance: 1,
        },
        expected: {
          id: entity.id,
          client: client,
          balance: 1,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
    ];

    for (const i of arrange) {
      output = await useCase.execute({
        id: i.input.id,
        client: i.input.client,
        balance: i.input.balance,
      });
      expect(output).toStrictEqual({
        id: entity.id,
        client: i.expected.client,
        balance: i.expected.balance,
        created_at: i.expected.created_at,
        updated_at: i.expected.updated_at,
      });
    }
  });
});
