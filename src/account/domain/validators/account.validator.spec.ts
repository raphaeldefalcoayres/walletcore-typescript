import Client from "#client/domain/entities/client";
import AccountValidatorFactory, {
  AccountRules,
  AccountValidator,
} from "./account.validator";
describe("AccountValidator Tests", () => {
  let validator: AccountValidator;

  beforeEach(() => (validator = AccountValidatorFactory.create()));

  const fakeClient = {
    id: "1",
    name: "client1",
    email: "client1@email.com",
  };

  const client = new Client(fakeClient);

  test("invalidation cases for client field", () => {
    expect({ validator, data: null }).containsErrorMessages({
      client: ["client should not be empty"],
    });

    expect({ validator, data: { client: null } }).containsErrorMessages({
      client: ["client should not be empty"],
    });

    expect({ validator, data: { client: "" } }).containsErrorMessages({
      client: ["client should not be empty"],
    });
  });

  test("invalidation cases for balance field", () => {
    expect({
      validator,
      data: { client: client, balance: "" },
    }).containsErrorMessages({
      balance: [
        "balance should not be empty",
        "balance must be a number conforming to the specified constraints",
      ],
    });
    expect({
      validator,
      data: { client: client, balance: "5" },
    }).containsErrorMessages({
      balance: [
        "balance must be a number conforming to the specified constraints",
      ],
    });
  });

  describe("valid cases for fields", () => {
    type Arrange = {
      client: Client;
      balance?: number;
    };

    const arrange: Arrange[] = [
      {
        client: client,
        balance: 1,
      },
    ];

    test.each(arrange)("validate %o", (item) => {
      const isValid = validator.validate(item as any);
      expect(isValid).toBeTruthy();
      expect(validator.validatedData).toStrictEqual(
        new AccountRules(item as any)
      );
    });
  });
});
