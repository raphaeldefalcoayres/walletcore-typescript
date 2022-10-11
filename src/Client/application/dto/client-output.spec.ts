import Client from "../../domain/entities/client";
import { ClientOutputMapper } from "./client-output";

describe("ClientOutputMapper Unit Tests", () => {
  it("should convert a client in output", () => {
    const created_at = new Date();
    const updated_at = new Date();
    const entity = new Client({
      name: "Movie",
      email: "some email",
      created_at,
      updated_at,
    });
    const spyToJSON = jest.spyOn(entity, "toJSON");
    const output = ClientOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.uuid,
      name: "Movie",
      email: "some email",
      created_at,
      updated_at,
    });
  });
});
