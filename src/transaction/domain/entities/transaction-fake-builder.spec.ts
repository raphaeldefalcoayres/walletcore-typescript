import { UniqueEntityId } from "#shared/value-objects";
import { TransactionFakeBuilder } from "./transaction-fake-builder";
// import { Chance } from "chance";

describe("TransactionFakerBuilder Unit Tests", () => {
  describe("id prop", () => {
    const faker = TransactionFakeBuilder.aTransaction();

    it("should be undefined", () => {
      expect(faker["_unique_entity_id"]).toBeUndefined();
    });

    test("withUniqueEntityId", () => {
      const uniqueEntityId = new UniqueEntityId();
      const $this = faker.withUniqueEntityId(uniqueEntityId);

      expect($this).toBeInstanceOf(TransactionFakeBuilder);
      expect(faker["_unique_entity_id"]).toBe(uniqueEntityId);
    });

    it("should pass index to id factory", () => {
      let mockFactory = jest
        .fn()
        .mockReturnValue("2f8453f4-6e42-4742-bb91-c1b5caa2ddce");
      faker.withUniqueEntityId(mockFactory);
      faker.build();
      expect(mockFactory).toHaveBeenCalledWith(0);

      mockFactory = jest
        .fn()
        .mockReturnValue("2f8453f4-6e42-4742-bb91-c1b5caa2ddce");
      const fakerMany = TransactionFakeBuilder.theTransactions(2);
      fakerMany.withUniqueEntityId(mockFactory);
      fakerMany.build();

      expect(mockFactory).toHaveBeenCalledWith(0);
      expect(mockFactory).toHaveBeenCalledWith(1);
    });
  });

  describe("amount prop", () => {
    const faker = TransactionFakeBuilder.aTransaction();
    it("should be a function", () => {
      expect(typeof faker["_amount"] === "function").toBeTruthy();
    });

    test("withAmount", () => {
      const $this = faker.withAmount(5);
      expect($this).toBeInstanceOf(TransactionFakeBuilder);
      expect(faker["_amount"]).toBe(5);

      faker.withAmount(() => 5);
      //@ts-expect-error amount is callable
      expect(faker["_amount"]()).toBe(5);

      expect(faker.amount).toBe(5);
    });

    it("should pass index to amount factory", () => {
      faker.withAmount((index) => index);
      const transaction = faker.build();
      expect(transaction.amount).toBe(0);

      const fakerMany = TransactionFakeBuilder.theTransactions(2);
      fakerMany.withAmount((index) => index);
      const transactions = fakerMany.build();

      expect(transactions[0].amount).toBe(0);
      expect(transactions[1].amount).toBe(1);
    });
  });

  describe("created_at prop", () => {
    const faker = TransactionFakeBuilder.aTransaction();

    it("should throw error when any with methods has called", () => {
      const fakerTransaction = TransactionFakeBuilder.aTransaction();
      expect(() => fakerTransaction.created_at).toThrow(
        new Error("Property created_at not have a factory, use 'with' methods")
      );
    });

    it("should be undefined", () => {
      expect(faker["_created_at"]).toBeUndefined();
    });

    test("withCreatedAt", () => {
      const date = new Date();
      const $this = faker.withCreatedAt(date);
      expect($this).toBeInstanceOf(TransactionFakeBuilder);
      expect(faker["_created_at"]).toBe(date);

      faker.withCreatedAt(() => date);
      expect(faker["_created_at"]()).toBe(date);
      expect(faker.created_at).toBe(date);
    });

    it("should pass index to created_at factory", () => {
      const date = new Date();
      faker.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const transaction = faker.build();
      expect(transaction.created_at.getTime()).toBe(date.getTime() + 2);

      const fakerMany = TransactionFakeBuilder.theTransactions(2);
      fakerMany.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const transactions = fakerMany.build();

      expect(transactions[0].created_at.getTime()).toBe(date.getTime() + 0 + 2);
      expect(transactions[1].created_at.getTime()).toBe(date.getTime() + 1 + 2);
    });
  });

  it("should create a transaction", () => {
    const faker = TransactionFakeBuilder.aTransaction();
    const uniqueEntityId = new UniqueEntityId(
      "16cb7417-d311-4dbf-b92a-3d2df80522a6"
    );
    let transaction = faker.build();

    // expect(typeof transaction.client === "string").toBeTruthy();
    expect(typeof transaction.amount === "number").toBeTruthy();
    expect(transaction.created_at).toBeInstanceOf(Date);

    const created_at = new Date();

    transaction = faker
      .withUniqueEntityId(uniqueEntityId)
      // .withClient("client test")
      .withAmount(5)
      .withCreatedAt(created_at)
      .build();

    expect(transaction.id).toBe("16cb7417-d311-4dbf-b92a-3d2df80522a6");
    expect(transaction.amount).toBe(5);
    expect(transaction.props.created_at).toEqual(created_at);
  });

  it("should create many transactions", () => {
    const faker = TransactionFakeBuilder.theTransactions(2);
    const uniqueEntityId = new UniqueEntityId();
    let transactions = faker.build();

    transactions.forEach((transaction) => {
      expect(typeof transaction.amount === "number").toBeTruthy();
      expect(transaction.created_at).toBeInstanceOf(Date);
    });

    const created_at = new Date();

    transactions = faker
      .withUniqueEntityId(uniqueEntityId)
      .withAmount(5)
      .withCreatedAt(created_at)
      .build();

    transactions.forEach((transaction) => {
      expect(transaction.uniqueEntityId).toBe(uniqueEntityId);
      expect(transaction.amount).toBe(5);
      expect(transaction.props.created_at).toEqual(created_at);
    });
  });
});
