import Transaction from "./transaction";
import { validate } from "uuid";

describe("Transaction Unit Tests", () => {
  test("constructor of transaction", () => {
    const transaction = new Transaction({});

    expect(transaction.props).not.toBeNull();
    expect(validate(transaction.id)).toBeTruthy();
  });
});
