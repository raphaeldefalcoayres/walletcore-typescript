import Account from "#account/domain/entities/account";
import Client from "#client/domain/entities/client";
import { AccountOutputMapper } from "./account-output";

describe("AccountOutputMapper Unit Tests", () => {
  it("should convert a account in output", () => {
    const created_at = new Date();
    const updated_at = new Date();
    const client = new Client({
      id: "1",
      name: "client1",
      email: "client1@email.com",
    });
    const entity = new Account({
      client: client,
      balance: 1,
      created_at,
      updated_at,
    });
    const spyToJSON = jest.spyOn(entity, "toJSON");
    const output = AccountOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.id,
      client: client,
      balance: 1,
      created_at,
      updated_at,
    });
  });
});
