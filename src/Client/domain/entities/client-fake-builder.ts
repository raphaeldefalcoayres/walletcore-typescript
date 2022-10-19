import { Chance } from "chance";
import Client from "./client";

type PropOrFactory<T> = T | ((index: number) => T);

export class ClientFakeBuilder<TBuild = any> {
  // auto generated in entity
  private _unique_entity_id: any = undefined;
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  private _email: PropOrFactory<string | null> = (_index) =>
    this.chance.email();
  // auto generated in entity
  private _created_at: any = undefined;
  private _updated_at: any = undefined;

  private countObjs;

  static aClient() {
    return new ClientFakeBuilder<Client>();
  }

  static theClients(countObjs: number) {
    return new ClientFakeBuilder<Client[]>(countObjs);
  }

  private chance: Chance.Chance;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  withUniqueEntityId(valueOrFactory: PropOrFactory<any>) {
    this._unique_entity_id = valueOrFactory;
    return this;
  }

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withInvalidNameEmpty(value: "" | null | undefined) {
    this._name = value;
    return this;
  }

  withInvalidNameNotAString(value?: any) {
    this._name = value ?? 5;
    return this;
  }

  withInvalidNameTooLong(value?: string) {
    this._name = value ?? this.chance.word({ length: 256 });
    return this;
  }

  withEmail(valueOrFactory: PropOrFactory<string | null>) {
    this._email = valueOrFactory;
    return this;
  }

  withInvalidEmailNotAString(value?: any) {
    this._email = value ?? 5;
    return this;
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._created_at = valueOrFactory;
    return this;
  }

  withUpdatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._updated_at = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const clients = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Client(
          {
            name: this.callFactory(this._name, index),
            email: this.callFactory(this._email, index),
            ...(this._created_at && {
              created_at: this.callFactory(this._created_at, index),
            }),
          },
          !this._unique_entity_id
            ? undefined
            : this.callFactory(this._unique_entity_id, index)
        )
    );
    return this.countObjs === 1 ? (clients[0] as any) : clients;
  }

  get id() {
    return this.getValue("id");
  }

  get name() {
    return this.getValue("name");
  }

  get email() {
    return this.getValue("email");
  }

  get created_at() {
    return this.getValue("created_at");
  }

  get updated_at() {
    return this.getValue("updated_at");
  }

  private getValue(prop: any) {
    const optional = ["id", "created_at"];
    const privateProp = `_${prop}`;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} not have a factory, use 'with' methods`
      );
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === "function"
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
