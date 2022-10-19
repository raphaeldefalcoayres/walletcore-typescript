import { ClientFakeBuilder } from "#client/domain";
import Client from "#client/domain/entities/client";
import { UniqueEntityId } from "#shared/value-objects";
import { Chance } from "chance";
import Account from "./account";

type PropOrFactory<T> = T | ((index: number) => T);

export class AccountFakeBuilder<TBuild = any> {
  // auto generated in entity
  private _unique_entity_id = undefined;
  private _client: PropOrFactory<Client> = (_index) =>
    ClientFakeBuilder.aClient().build();
  private _balance: PropOrFactory<number | null> = (_index) =>
    this.chance.floating({ fixed: 2, min: 1, max: 10000 });
  // auto generated in entity
  private _created_at: any = undefined;
  private _updated_at: any = undefined;

  private countObjs;

  static aAccount() {
    return new AccountFakeBuilder<Account>();
  }

  static theAccounts(countObjs: number) {
    return new AccountFakeBuilder<Account[]>(countObjs);
  }

  private chance: Chance.Chance;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  withUniqueEntityId(valueOrFactory: PropOrFactory<UniqueEntityId>) {
    this._unique_entity_id = valueOrFactory;
    return this;
  }

  withClient(valueOrFactory: PropOrFactory<Client>) {
    this._client = valueOrFactory;
    return this;
  }

  withBalance(valueOrFactory: PropOrFactory<number>) {
    this._balance = valueOrFactory;
    return this;
  }

  withInvalidBalanceNotAString(value?: any) {
    this._balance = value ?? 5;
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
    const accounts = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Account(
          {
            client: this.callFactory(this._client, index),
            balance: this.callFactory(this._balance, index),
            ...(this._created_at && {
              created_at: this.callFactory(this._created_at, index),
            }),
          },
          !this._unique_entity_id
            ? undefined
            : this.callFactory(this._unique_entity_id, index)
        )
    );
    return this.countObjs === 1 ? (accounts[0] as any) : accounts;
  }

  get id() {
    return this.getValue("id");
  }

  get client() {
    return this.getValue("client");
  }

  get balance() {
    return this.getValue("balance");
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
