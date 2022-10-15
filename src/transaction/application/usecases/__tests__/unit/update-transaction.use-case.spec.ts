import { NotFoundError } from "#shared/errors";
import Transaction from "#transaction/domain/entities/transaction";
import UpdateTransactionUseCase from "../../update-transaction.use-case";
import { TransactionInMemoryRepository } from "#transaction/infra/repository/db/in-memory";

describe("UpdateTransactionUseCase Unit Tests", () => {
  let useCase: UpdateTransactionUseCase.UseCase;
  let repository: TransactionInMemoryRepository;

  beforeEach(() => {
    repository = new TransactionInMemoryRepository();
    useCase = new UpdateTransactionUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() =>
      useCase.execute({ id: "fake id" })
    ).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
  });

  it("should update a transaction", async () => {
    const spyUpdate = jest.spyOn(repository, "update");
    const entity = new Transaction({});
    repository.items = [entity];

    let output = await useCase.execute({
      id: entity.id,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.id,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });

    type Arrange = {
      input: {
        id: string;
      };
      expected: {
        id: string;
        created_at: Date;
        updated_at: Date;
      };
    };
    const arrange: Arrange[] = [
      {
        input: {
          id: entity.id,
        },
        expected: {
          id: entity.id,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.id,
        },
        expected: {
          id: entity.id,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.id,
        },
        expected: {
          id: entity.id,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.id,
        },
        expected: {
          id: entity.id,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.id,
        },
        expected: {
          id: entity.id,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
      {
        input: {
          id: entity.id,
        },
        expected: {
          id: entity.id,
          created_at: entity.created_at,
          updated_at: entity.updated_at,
        },
      },
    ];

    for (const i of arrange) {
      output = await useCase.execute({
        id: i.input.id,
      });
      expect(output).toStrictEqual({
        id: entity.id,
        created_at: i.expected.created_at,
        updated_at: i.expected.updated_at,
      });
    }
  });
});
