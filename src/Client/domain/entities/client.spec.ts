import { UniqueEntityId } from "#shared/value-objects";
import { omit } from "lodash";
import Client, { ClientProperties } from "./client";

describe("Client Unit Tests", () => {
  beforeEach(() => {
    Client.validate = jest.fn();
  });
  test("constructor of client", () => {
    let client = new Client({ name: "client1", email: "email1@email.com" });
    let props = omit(client.props, "created_at");
    expect(Client.validate).toHaveBeenCalled();
    expect(props).toMatchObject({
      name: "client1",
      email: "email1@email.com",
    });
    expect(client.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date(); //string
    client = new Client({
      name: "Client1",
      email: "some email",
      created_at,
    });
    expect(client.props).toMatchObject({
      name: "Client1",
      email: "some email",
      created_at,
    });

    client = new Client({
      name: "Client1",
      email: "other email",
    });
    expect(client.props).toMatchObject({
      name: "Client1",
      email: "other email",
    });

    client = new Client({
      name: "Client1",
      email: "other email",
    });
    expect(client.props).toMatchObject({
      name: "Client1",
    });

    created_at = new Date();
    client = new Client({
      name: "Client1",
      email: "other email",
      created_at,
    });
    expect(client.props).toMatchObject({
      name: "Client1",
      email: "other email",
      created_at,
    });
  });

  describe("id field", () => {
    type ClientData = { props: ClientProperties; id?: UniqueEntityId };
    const arrange: ClientData[] = [
      { props: { name: "Client1", email: "email1@email.com" } },
      { props: { name: "Client1", email: "email1@email.com" }, id: null },
      { props: { name: "Client1", email: "email1@email.com" }, id: undefined },
      {
        props: { name: "Client1", email: "email1@email.com" },
        id: new UniqueEntityId(),
      },
    ];

    test.each(arrange)("when props is %j", (item) => {
      const client = new Client(item.props, item.id as any);
      expect(client.id).not.toBeNull();
      expect(client.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("getter and setter of name prop", () => {
    const client = new Client({ name: "Client1", email: "email1@email.com" });
    expect(client.name).toBe("Client1");

    client["name"] = "other name";
    expect(client.name).toBe("other name");
  });

  test("getter and setter of email prop", () => {
    let client = new Client({
      name: "Client1",
      email: "Email1",
    });
    expect(client.email).toBe("Email1");

    client = new Client({
      name: "Client1",
      email: "some email",
    });
    expect(client.email).toBe("some email");

    client = new Client({
      name: "Client1",
      email: "other email",
    });

    client["email"] = "other email";
    expect(client.email).toBe("other email");
  });

  test("getter of created_at prop", () => {
    let client = new Client({
      name: "Client1",
      email: "other email",
    });

    expect(client.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    client = new Client({
      name: "Client1",
      email: "other email",
      created_at,
    });
    expect(client.created_at).toBe(created_at);
  });

  it("should update a client", () => {
    const client = new Client({ name: "Client1", email: "email1@email.com" });
    client.update("Documentary", "some email");
    expect(Client.validate).toHaveBeenCalledTimes(2);
    expect(client.name).toBe("Documentary");
    expect(client.email).toBe("some email");
  });
});
