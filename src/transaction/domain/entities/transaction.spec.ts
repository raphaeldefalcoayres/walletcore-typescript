import Transaction from "./transaction";
import { validate } from "uuid";
import Client from "#client/domain/entities/client";
import Account from "#account/domain/entities/account";

describe("Transaction Unit Tests", () => {
  test("constructor of transaction", () => {
    const fakeClient1 = {
      name: "client1",
      email: "client1@email.com",
    };

    const client1 = new Client(fakeClient1);

    const fakeAccount1 = {
      client: client1,
      balance: 1,
    };

    const account1 = new Account(fakeAccount1);

    const fakeClient2 = {
      name: "client2",
      email: "client2@email.com",
    };

    const client2 = new Client(fakeClient2);

    const fakeAccount2 = {
      client: client2,
      balance: 2,
    };

    const account2 = new Account(fakeAccount2);

    const accountFake = {
      accountFrom: account1,
      accountTo: account2,
      amount: 1,
    };

    const transaction = new Transaction(accountFake);

    expect(transaction.props).not.toBeNull();
    expect(validate(transaction.id)).toBeTruthy();
  });
});
