import Account from "#account/domain/entities/account";
import { validate } from "uuid";
import Client, { ClientProperties } from "./client";

type Arrange = { props: ClientProperties; id?: string };

describe("Client Unit Tests", () => {
  const arrange = {
    id: "1",
    name: "client1",
    email: "client1@email.com",
  };

  test("constructor of client", () => {
    const client = new Client(arrange);

    expect(client.props).toStrictEqual(arrange);
  });

  test("constructor of client with invalid id", () => {
    const idValidateSpy = jest.spyOn(Client.prototype as any, "idValidate");

    expect(() => new Client(arrange, "1234")).toThrow(
      "Id must be a valid UUID v4"
    );
    expect(idValidateSpy).toHaveBeenCalled();
  });

  test("getter of id field", () => {
    const arranges: Arrange[] = [
      { props: arrange },
      { props: arrange, id: null },
      { props: arrange, id: undefined },
      { props: arrange, id: "924251b2-bc4b-483f-9cdd-011b5da88d85" },
    ];

    arranges.forEach((item) => {
      const client = new Client(item.props, item.id);
      expect(client.id).not.toBeNull();
      expect(validate(client.id)).toBeTruthy();
    });
  });

  test("getter of name field", () => {
    const client = new Client(arrange);

    expect(client.name).toBe("client1");
  });

  test("getter of email field", () => {
    const client = new Client(arrange);

    expect(client.email).toBe("client1@email.com");
  });

  test("add account", () => {
    const client = new Client({
      id: "1",
      name: "client1",
      email: "client1@email.com",
    });
    const account = new Account({
      client,
      balance: 0,
    });
    client.addAccount(account);

    expect(client.accounts.length).toBe(1);
  });
});
