import { AccountFakeBuilder } from "#account/domain";
import Account from "#account/domain/entities/account";
import { UniqueEntityId } from "#shared/value-objects";
import { Chance } from "chance";
import Transaction from "./transaction";

type PropOrFactory<T> = T | ((index: number) => T);

export class TransactionFakeBuilder<TBuild = any> {
  // auto generated in entity
  private _unique_entity_id = undefined;
  private _accountFrom: PropOrFactory<Account> = (_index) =>
    AccountFakeBuilder.aAccount().build();
  private _accountTo: PropOrFactory<Account> = (_index) =>
    AccountFakeBuilder.aAccount().build();
  private _amount: PropOrFactory<Number> = (_index) =>
    this.chance.floating({ fixed: 2, min: 1, max: 10000 });

  // auto generated in entity
  private _created_at: any = undefined;

  private countObjs;

  static aTransaction() {
    return new TransactionFakeBuilder<Transaction>();
  }

  static theTransactions(countObjs: number) {
    return new TransactionFakeBuilder<Transaction[]>(countObjs);
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

  withAccountFrom(valueOrFactory: PropOrFactory<Account>) {
    this._accountFrom = valueOrFactory;
    return this;
  }

  withAccountTo(valueOrFactory: PropOrFactory<Account>) {
    this._accountTo = valueOrFactory;
    return this;
  }

  withInvalidAccountFrom(value?: any) {
    this._accountTo = value ?? 5;
    return this;
  }

  withInvalidAccountTo(value?: any) {
    this._accountTo = value ?? 5;
    return this;
  }

  withInvalidAmount(value?: any) {
    this._accountTo = value ?? -1;
    return this;
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._created_at = valueOrFactory;
    return this;
  }

  withAmount(valueOrFactory: PropOrFactory<Number>) {
    this._amount = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const transactions = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Transaction(
          {
            accountFrom: this.callFactory(this._accountFrom, index),
            accountTo: this.callFactory(this._accountTo, index),
            amount: this.callFactory(this._amount, index),
            ...(this._created_at && {
              created_at: this.callFactory(this._created_at, index),
            }),
          },
          !this._unique_entity_id
            ? undefined
            : this.callFactory(this._unique_entity_id, index)
        )
    );
    return this.countObjs === 1 ? (transactions[0] as any) : transactions;
  }

  get accountFrom() {
    return this.getValue("accountFrom");
  }

  get accountTo() {
    return this.getValue("accountTo");
  }

  get created_at() {
    return this.getValue("created_at");
  }

  get amount() {
    return this.getValue("amount");
  }

  get id() {
    return this.getValue("id");
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
