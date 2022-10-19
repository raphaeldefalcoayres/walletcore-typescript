import { ClientFakeBuilder } from "./client-fake-builder";
import { Chance } from "chance";
import { UniqueEntityId } from "#shared/value-objects";

describe("ClientFakerBuilder Unit Tests", () => {
  describe("uuid prop", () => {
    const faker = ClientFakeBuilder.aClient();

    it("should be undefined", () => {
      expect(faker["_unique_entity_id"]).toBeUndefined();
    });

    test("withUniqueEntityId", () => {
      const uniqueEntityId = new UniqueEntityId();
      const $this = faker.withUniqueEntityId(uniqueEntityId);

      expect($this).toBeInstanceOf(ClientFakeBuilder);
      expect(faker["_unique_entity_id"]).toBe(uniqueEntityId);
    });

    it("should pass index to uuid factory", () => {
      let mockFactory = jest
        .fn()
        .mockReturnValue("2f8453f4-6e42-4742-bb91-c1b5caa2ddce");
      faker.withUniqueEntityId(mockFactory);
      faker.build();
      expect(mockFactory).toHaveBeenCalledWith(0);

      mockFactory = jest
        .fn()
        .mockReturnValue("2f8453f4-6e42-4742-bb91-c1b5caa2ddce");
      const fakerMany = ClientFakeBuilder.theClients(2);
      fakerMany.withUniqueEntityId(mockFactory);
      fakerMany.build();

      expect(mockFactory).toHaveBeenCalledWith(0);
      expect(mockFactory).toHaveBeenCalledWith(1);
    });
  });

  describe("name prop", () => {
    const faker = ClientFakeBuilder.aClient();
    it("should be a function", () => {
      expect(typeof faker["_name"] === "function").toBeTruthy();
    });

    it("should call the word method", () => {
      const chance = Chance();
      const spyWordMethod = jest.spyOn(chance, "word");
      faker["chance"] = chance;
      faker.build();

      expect(spyWordMethod).toHaveBeenCalled();
    });

    test("withName", () => {
      const $this = faker.withName("test name");
      expect($this).toBeInstanceOf(ClientFakeBuilder);
      expect(faker["_name"]).toBe("test name");

      faker.withName(() => "test name");
      //@ts-expect-error name is callable
      expect(faker["_name"]()).toBe("test name");

      expect(faker.name).toBe("test name");
    });

    it("should pass index to name factory", () => {
      faker.withName((index) => `test name ${index}`);
      const client = faker.build();
      expect(client.name).toBe(`test name 0`);

      const fakerMany = ClientFakeBuilder.theClients(2);
      fakerMany.withName((index) => `test name ${index}`);
      const clients = fakerMany.build();

      expect(clients[0].name).toBe(`test name 0`);
      expect(clients[1].name).toBe(`test name 1`);
    });

    test("invalid empty case", () => {
      const $this = faker.withInvalidNameEmpty(undefined);
      expect($this).toBeInstanceOf(ClientFakeBuilder);
      expect(faker["_name"]).toBeUndefined();

      faker.withInvalidNameEmpty(null);
      expect(faker["_name"]).toBeNull();

      faker.withInvalidNameEmpty("");
      expect(faker["_name"]).toBe("");
    });

    test("invalid too long case", () => {
      const $this = faker.withInvalidNameTooLong();
      expect($this).toBeInstanceOf(ClientFakeBuilder);
      expect(faker["_name"].length).toBe(256);

      const tooLong = "a".repeat(256);
      faker.withInvalidNameTooLong(tooLong);
      expect(faker["_name"].length).toBe(256);
      expect(faker["_name"]).toBe(tooLong);
    });
  });

  describe("email prop", () => {
    const faker = ClientFakeBuilder.aClient();
    it("should be a function", () => {
      expect(typeof faker["_email"] === "function").toBeTruthy();
    });

    it("should call the email method", () => {
      const chance = Chance();
      const spyWordMethod = jest.spyOn(chance, "email");
      faker["chance"] = chance;
      faker.build();

      expect(spyWordMethod).toHaveBeenCalled();
    });

    test("withEmail", () => {
      const $this = faker.withEmail("test email");
      expect($this).toBeInstanceOf(ClientFakeBuilder);
      expect(faker["_email"]).toBe("test email");

      faker.withEmail(() => "test email");
      //@ts-expect-error email is callable
      expect(faker["_email"]()).toBe("test email");

      expect(faker.email).toBe("test email");
    });

    it("should pass index to email factory", () => {
      faker.withEmail((index) => `test email ${index}`);
      const client = faker.build();
      expect(client.email).toBe(`test email 0`);

      const fakerMany = ClientFakeBuilder.theClients(2);
      fakerMany.withEmail((index) => `test email ${index}`);
      const clients = fakerMany.build();

      expect(clients[0].email).toBe(`test email 0`);
      expect(clients[1].email).toBe(`test email 1`);
    });
  });

  describe("created_at prop", () => {
    const faker = ClientFakeBuilder.aClient();

    it("should throw error when any with methods has called", () => {
      const fakerClient = ClientFakeBuilder.aClient();
      expect(() => fakerClient.created_at).toThrow(
        new Error("Property created_at not have a factory, use 'with' methods")
      );
    });

    it("should be undefined", () => {
      expect(faker["_created_at"]).toBeUndefined();
    });

    test("withCreatedAt", () => {
      const date = new Date();
      const $this = faker.withCreatedAt(date);
      expect($this).toBeInstanceOf(ClientFakeBuilder);
      expect(faker["_created_at"]).toBe(date);

      faker.withCreatedAt(() => date);
      expect(faker["_created_at"]()).toBe(date);
      expect(faker.created_at).toBe(date);
    });

    it("should pass index to created_at factory", () => {
      const date = new Date();
      faker.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const client = faker.build();
      expect(client.created_at.getTime()).toBe(date.getTime() + 2);

      const fakerMany = ClientFakeBuilder.theClients(2);
      fakerMany.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const clients = fakerMany.build();

      expect(clients[0].created_at.getTime()).toBe(date.getTime() + 0 + 2);
      expect(clients[1].created_at.getTime()).toBe(date.getTime() + 1 + 2);
    });
  });

  it("should create a client", () => {
    const faker = ClientFakeBuilder.aClient();
    const uniqueEntityId = new UniqueEntityId();
    let client = faker.build();

    expect(typeof client.name === "string").toBeTruthy();
    expect(typeof client.email === "string").toBeTruthy();
    expect(client.created_at).toBeInstanceOf(Date);

    const created_at = new Date();

    client = faker
      .withUniqueEntityId(uniqueEntityId)
      .withName("name test")
      .withEmail("email test")
      .withCreatedAt(created_at)
      .build();

    expect(client.uniqueEntityId).toBe(uniqueEntityId);
    expect(client.name).toBe("name test");
    expect(client.email).toBe("email test");
    expect(client.props.created_at).toEqual(created_at);
  });

  it("should create many clients", () => {
    const faker = ClientFakeBuilder.theClients(2);
    const uniqueEntityId = new UniqueEntityId();
    let clients = faker.build();

    clients.forEach((client) => {
      expect(typeof client.name === "string").toBeTruthy();
      expect(typeof client.email === "string").toBeTruthy();
      expect(client.created_at).toBeInstanceOf(Date);
    });

    const created_at = new Date();

    clients = faker
      .withUniqueEntityId(uniqueEntityId)
      .withName("name test")
      .withEmail("email test")
      .withCreatedAt(created_at)
      .build();

    clients.forEach((client) => {
      expect(client.uniqueEntityId).toBe(uniqueEntityId);
      expect(client.name).toBe("name test");
      expect(client.email).toBe("email test");
      expect(client.props.created_at).toEqual(created_at);
    });
  });
});
