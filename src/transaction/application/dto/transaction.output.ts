import Transaction from "#transaction/domain/entities/transaction";

export type TransactionOutput = {
  id: string;
  created_at: Date;
};

export class TransactionOutputMapper {
  static toOutput(entity: Transaction): TransactionOutput {
    return entity.toJSON();
  }
}
