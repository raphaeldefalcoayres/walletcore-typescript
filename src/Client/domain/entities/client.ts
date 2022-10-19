import ClientValidatorFactory from "../validators/client.validator";
import { EntityValidationError } from "#shared/errors";
import Entity from "#shared/entities/entity";
import Account from "#account/domain/entities/account";
import { UniqueEntityId } from "#shared/value-objects";

export type ClientProperties = {
  name: string;
  email: string;
  accounts?: Account[];
  created_at?: Date;
  updated_at?: Date;
};

export default class Client extends Entity<ClientProperties> {
  constructor(public readonly props: ClientProperties, id?: UniqueEntityId) {
    super(props, id);
    Client.validate(props);
    this.props.created_at = this.created_at ?? new Date();
    this.props.updated_at = this.updated_at ?? new Date();
  }

  update(name: string, email: string): void {
    Client.validate({
      name,
      email,
    });
    this.name = name;
    this.email = email;
  }

  addAccount(account: Account) {
    if (account.client.id !== this.id) {
      throw new Error("Account does not belong to client");
    }
    this.accounts = this.accounts
      ? this.accounts.push(account)
      : ([account] as any);
  }

  get name() {
    return this.props.name;
  }

  get accounts() {
    return this.props.accounts;
  }

  get email() {
    return this.props.email;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  private set name(value) {
    this.props.name = value;
  }

  private set email(value) {
    this.props.email = value;
  }

  private set accounts(value) {
    this.props.accounts = value;
  }

  static validate(props: ClientProperties) {
    const validator = ClientValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
