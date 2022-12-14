import AccountValidatorFactory from "../validators/account.validator";
import { EntityValidationError } from "#shared/errors";
import Entity from "#shared/entities/entity";
import Client from "#client/domain/entities/client";
import { UniqueEntityId } from "#shared/value-objects";

export type AccountPropertiesCreate = {
  client: Client;
  balance: number;
  created_at?: Date;
  updated_at?: Date;
};

export type AccountPropertiesUpdate = {
  client?: Client;
  balance?: number;
  created_at?: Date;
  updated_at?: Date;
};

export default class Account extends Entity<AccountPropertiesCreate> {
  constructor(
    public readonly props: AccountPropertiesCreate,
    id?: UniqueEntityId
  ) {
    super(props, id);
    Account.validate(props);
    this.props.created_at = this.created_at ?? new Date();
    this.props.updated_at = this.updated_at ?? new Date();
  }

  update(client: Client, balance: number): void {
    Account.validate({
      client,
      balance,
    });
    this.client = client;
    this.balance = balance;
  }

  credit(amount: number) {
    this.balance += amount;
    this.updated_at = new Date();
  }

  debit(amount: number) {
    Account.validate({
      client: this.client,
      balance: this.balance,
    });
    this.balance -= amount;
    this.updated_at = new Date();
  }

  get client() {
    return this.props.client;
  }

  get balance() {
    return this.props.balance;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  private set client(value) {
    this.props.client = value;
  }

  private set balance(value) {
    this.props.balance = value;
  }

  private set updated_at(value) {
    this.props.updated_at = value;
  }

  static validate(props: AccountPropertiesUpdate) {
    const validator = AccountValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
