import { Chance } from "chance";
import Client from "./client";

type PropOrFactory<T> = T | ((index: number) => T);

export class ClientFakeBuilder<TBuild = any> {
  // auto generated in entity
  private _uuid: any = undefined;
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

  static theCategories(countObjs: number) {
    return new ClientFakeBuilder<Client[]>(countObjs);
  }

  private chance: Chance.Chance;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  withUUID(valueOrFactory: PropOrFactory<any>) {
    this._uuid = valueOrFactory;
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
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Client(
          {
            name: this.callFactory(this._name, index),
            email: this.callFactory(this._email, index),
            ...(this._created_at && {
              created_at: this.callFactory(this._created_at, index),
            }),
          },
          !this._uuid ? undefined : this.callFactory(this._uuid, index)
        )
    );
    return this.countObjs === 1 ? (categories[0] as any) : categories;
  }

  get uuid() {
    return this.getValue("uuid");
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
    const optional = ["uuid", "created_at"];
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
