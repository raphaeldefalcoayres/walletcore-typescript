import { validate } from "uuid";
import Transaction, { TransactionProperties } from "./transaction";

type Arrange = { props: TransactionProperties; id?: string };

describe("Transaction Unit Tests", () => {
  test("getter of id field", () => {
    expect(true).toBe(true)
  });
});
