import TransactionInMemoryRepository from "./transaction-in-memory.repository";

describe("TransactionInMemoryRepository", () => {
  let repository: TransactionInMemoryRepository;

  beforeEach(() => (repository = new TransactionInMemoryRepository()));
  it("Example", async () => {
    expect(true).toBe(true);
  });
});
