import TransactionValidatorFactory from "../validators/transaction.validator";
import { EntityValidationError } from "#shared/errors";
import Entity from "#shared/entities/entity";
import Account from "#account/domain/entities/account";
import { UniqueEntityId } from "#shared/value-objects";

export type TransactionProperties = {
  id?: string;
  accountFrom: Account;
  accountTo: Account;
  amount: number;
  created_at?: Date;
};

export default class Transaction extends Entity<TransactionProperties> {
  constructor(
    public readonly props: TransactionProperties,
    id?: UniqueEntityId
  ) {
    super(props, id);
    Transaction.validate(props);
    Transaction.commit(props);
    this.props.created_at = this.created_at ?? new Date();
  }

  get created_at() {
    return this.props.created_at;
  }

  get accountFrom() {
    return this.props.accountFrom;
  }

  get accountTo() {
    return this.props.accountTo;
  }

  get amount() {
    return this.props.amount;
  }

  private set created_at(value) {
    this.props.created_at = value;
  }

  static commit(props: TransactionProperties) {
    props.accountFrom.debit(props.amount);
    props.accountTo.credit(props.amount);
  }

  static validate(props: TransactionProperties) {
    const validator = TransactionValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
