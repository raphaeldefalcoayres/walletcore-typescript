import Client from "#client/domain/entities/client";
import { validate } from "uuid";
import Account, { AccountProperties } from "./account";

type Arrange = { props: AccountProperties; id?: string };

describe("Account Unit Tests", () => {
  const fakeClient = {
    id: "1",
    name: "client1",
    email: "client1@email.com",
  };

  const client = new Client(fakeClient);

  const arrange = {
    id: "1",
    client: client,
    balance: 1,
  };

  test("constructor of account", () => {
    const account = new Account(arrange);

    expect(account.props).toStrictEqual(arrange);
  });

  test("constructor of account with invalid id", () => {
    const idValidateSpy = jest.spyOn(Account.prototype as any, "idValidate");

    expect(() => new Account(arrange, "1234")).toThrow(
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
      const account = new Account(item.props, item.id);
      expect(account.id).not.toBeNull();
      expect(validate(account.id)).toBeTruthy();
    });
  });

  test("getter of client field", () => {
    const account = new Account(arrange);

    expect(account.client).toBe(client);
  });

  test("getter of balance field", () => {
    const account = new Account(arrange);

    expect(account.balance).toBe(1);
  });

  test("credit account", () => {
    const client = new Client(fakeClient);
    const account = new Account({
      client,
      balance: 0,
    });
    account.credit(100);

    expect(account.balance).toEqual(100);
  });

  test("debit account", () => {
    const client = new Client(fakeClient);
    const account = new Account({
      client,
      balance: 0,
    });
    account.credit(100);
    account.debit(50);

    expect(account.balance).toEqual(50);
  });
});
