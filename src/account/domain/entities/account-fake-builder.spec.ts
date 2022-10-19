import { UniqueEntityId } from "#shared/value-objects";
import { AccountFakeBuilder } from "./account-fake-builder";

describe("AccountFakerBuilder Unit Tests", () => {
  describe("id prop", () => {
    const faker = AccountFakeBuilder.aAccount();

    it("should be undefined", () => {
      expect(faker["_unique_entity_id"]).toBeUndefined();
    });

    test("withUniqueEntityId", () => {
      const uniqueEntityId = new UniqueEntityId();
      const $this = faker.withUniqueEntityId(uniqueEntityId);

      expect($this).toBeInstanceOf(AccountFakeBuilder);
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
      const fakerMany = AccountFakeBuilder.theAccounts(2);
      fakerMany.withUniqueEntityId(mockFactory);
      fakerMany.build();

      expect(mockFactory).toHaveBeenCalledWith(0);
      expect(mockFactory).toHaveBeenCalledWith(1);
    });
  });

  describe("balance prop", () => {
    const faker = AccountFakeBuilder.aAccount();
    it("should be a function", () => {
      expect(typeof faker["_balance"] === "function").toBeTruthy();
    });

    test("withBalance", () => {
      const $this = faker.withBalance(5);
      expect($this).toBeInstanceOf(AccountFakeBuilder);
      expect(faker["_balance"]).toBe(5);

      faker.withBalance(() => 5);
      //@ts-expect-error balance is callable
      expect(faker["_balance"]()).toBe(5);

      expect(faker.balance).toBe(5);
    });

    it("should pass index to balance factory", () => {
      faker.withBalance((index) => index);
      const account = faker.build();
      expect(account.balance).toBe(0);

      const fakerMany = AccountFakeBuilder.theAccounts(2);
      fakerMany.withBalance((index) => index);
      const accounts = fakerMany.build();

      expect(accounts[0].balance).toBe(0);
      expect(accounts[1].balance).toBe(1);
    });
  });

  describe("created_at prop", () => {
    const faker = AccountFakeBuilder.aAccount();

    it("should throw error when any with methods has called", () => {
      const fakerAccount = AccountFakeBuilder.aAccount();
      expect(() => fakerAccount.created_at).toThrow(
        new Error("Property created_at not have a factory, use 'with' methods")
      );
    });

    it("should be undefined", () => {
      expect(faker["_created_at"]).toBeUndefined();
    });

    test("withCreatedAt", () => {
      const date = new Date();
      const $this = faker.withCreatedAt(date);
      expect($this).toBeInstanceOf(AccountFakeBuilder);
      expect(faker["_created_at"]).toBe(date);

      faker.withCreatedAt(() => date);
      expect(faker["_created_at"]()).toBe(date);
      expect(faker.created_at).toBe(date);
    });

    it("should pass index to created_at factory", () => {
      const date = new Date();
      faker.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const account = faker.build();
      expect(account.created_at.getTime()).toBe(date.getTime() + 2);

      const fakerMany = AccountFakeBuilder.theAccounts(2);
      fakerMany.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const accounts = fakerMany.build();

      expect(accounts[0].created_at.getTime()).toBe(date.getTime() + 0 + 2);
      expect(accounts[1].created_at.getTime()).toBe(date.getTime() + 1 + 2);
    });
  });

  it("should create a account", () => {
    const faker = AccountFakeBuilder.aAccount();
    const uniqueEntityId = new UniqueEntityId();
    let account = faker.build();

    expect(typeof account.balance === "number").toBeTruthy();
    expect(account.created_at).toBeInstanceOf(Date);

    const created_at = new Date();

    account = faker
      .withUniqueEntityId(uniqueEntityId)
      .withBalance(5)
      .withCreatedAt(created_at)
      .build();

    expect(account.uniqueEntityId).toBe(uniqueEntityId);
    expect(account.balance).toBe(5);
    expect(account.props.created_at).toEqual(created_at);
  });

  it("should create many accounts", () => {
    const faker = AccountFakeBuilder.theAccounts(2);
    const uniqueEntityId = new UniqueEntityId();
    let accounts = faker.build();

    accounts.forEach((account) => {
      expect(typeof account.balance === "number").toBeTruthy();
      expect(account.created_at).toBeInstanceOf(Date);
    });

    const created_at = new Date();
    const uniqueEntityId2 = new UniqueEntityId();

    accounts = faker
      .withUniqueEntityId(uniqueEntityId2)
      .withBalance(5)
      .withCreatedAt(created_at)
      .build();

    accounts.forEach((account) => {
      expect(account.uniqueEntityId).toBe(uniqueEntityId2);
      expect(account.balance).toBe(5);
      expect(account.props.created_at).toEqual(created_at);
    });
  });
});
