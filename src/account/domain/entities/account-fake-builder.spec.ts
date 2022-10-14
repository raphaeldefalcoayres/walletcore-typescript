import { AccountFakeBuilder } from "./account-fake-builder";
// import { Chance } from "chance";

describe("AccountFakerBuilder Unit Tests", () => {
  describe("uuid prop", () => {
    const faker = AccountFakeBuilder.aAccount();

    it("should be undefined", () => {
      expect(faker["_uuid"]).toBeUndefined();
    });

    test("withUUID", () => {
      const uniqueEntityId = "2f8453f4-6e42-4742-bb91-c1b5caa2ddce";
      const $this = faker.withUUID(uniqueEntityId);
      expect($this).toBeInstanceOf(AccountFakeBuilder);
      expect(faker["_uuid"]).toBe(uniqueEntityId);

      faker.withUUID(() => uniqueEntityId);
      expect(faker["_uuid"]()).toBe(uniqueEntityId);

      expect(faker.uuid).toBe(uniqueEntityId);
    });

    it("should pass index to uuid factory", () => {
      let mockFactory = jest
        .fn()
        .mockReturnValue("2f8453f4-6e42-4742-bb91-c1b5caa2ddce");
      faker.withUUID(mockFactory);
      faker.build();
      expect(mockFactory).toHaveBeenCalledWith(0);

      mockFactory = jest
        .fn()
        .mockReturnValue("2f8453f4-6e42-4742-bb91-c1b5caa2ddce");
      const fakerMany = AccountFakeBuilder.theAccounts(2);
      fakerMany.withUUID(mockFactory);
      fakerMany.build();

      expect(mockFactory).toHaveBeenCalledWith(0);
      expect(mockFactory).toHaveBeenCalledWith(1);
    });
  });

  // describe("client prop", () => {
  //   const faker = AccountFakeBuilder.aAccount();
  //   it("should be a function", () => {
  //     expect(typeof faker["_client"] === "function").toBeTruthy();
  //   });

  //   it("should call the word method", () => {
  //     const chance = Chance();
  //     const spyWordMethod = jest.spyOn(chance, "word");
  //     faker["chance"] = chance;
  //     faker.build();

  //     expect(spyWordMethod).toHaveBeenCalled();
  //   });

  //   test("withClient", () => {
  //     const $this = faker.withClient("test client");
  //     expect($this).toBeInstanceOf(AccountFakeBuilder);
  //     expect(faker["_client"]).toBe("test client");

  //     faker.withClient(() => "test client");
  //     //@ts-expect-error client is callable
  //     expect(faker["_client"]()).toBe("test client");

  //     expect(faker.client).toBe("test client");
  //   });

  //   it("should pass index to client factory", () => {
  //     faker.withClient((index) => `test client ${index}`);
  //     const account = faker.build();
  //     expect(account.client).toBe(`test client 0`);

  //     const fakerMany = AccountFakeBuilder.theAccounts(2);
  //     fakerMany.withClient((index) => `test client ${index}`);
  //     const accounts = fakerMany.build();

  //     expect(accounts[0].client).toBe(`test client 0`);
  //     expect(accounts[1].client).toBe(`test client 1`);
  //   });
  // });

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
    const uniqueEntityId: string = "2f8453f4-6e42-4742-bb91-c1b5caa2ddce";
    let account = faker.build();

    // expect(typeof account.client === "string").toBeTruthy();
    expect(typeof account.balance === "number").toBeTruthy();
    expect(account.created_at).toBeInstanceOf(Date);

    const created_at = new Date();

    account = faker
      .withUUID(uniqueEntityId)
      // .withClient("client test")
      .withBalance(5)
      .withCreatedAt(created_at)
      .build();

    expect(account.uuid).toBe(uniqueEntityId);
    // expect(account.client).toBe("client test");
    expect(account.balance).toBe(5);
    expect(account.props.created_at).toEqual(created_at);
  });

  it("should create many accounts", () => {
    const faker = AccountFakeBuilder.theAccounts(2);
    const uniqueEntityId = "2f8453f4-6e42-4742-bb91-c1b5caa2ddce";
    let accounts = faker.build();

    accounts.forEach((account) => {
      // expect(typeof account.client === "Client").toBeTruthy();
      expect(typeof account.balance === "number").toBeTruthy();
      expect(account.created_at).toBeInstanceOf(Date);
    });

    const created_at = new Date();

    accounts = faker
      .withUUID(uniqueEntityId)
      // .withClient("client test")
      .withBalance(5)
      .withCreatedAt(created_at)
      .build();

    accounts.forEach((account) => {
      expect(account.uuid).toBe(uniqueEntityId);
      // expect(account.client).toBe("client test");
      expect(account.balance).toBe(5);
      expect(account.props.created_at).toEqual(created_at);
    });
  });
});
