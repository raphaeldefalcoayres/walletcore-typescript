import Transaction from "#transaction/domain/entities/transaction";

export type TransactionOutput = {
  id: string;
  transactions?: Transaction[];
  created_at: Date;
  updated_at: Date;
};

export class TransactionOutputMapper {
  static toOutput(entity: Transaction): TransactionOutput {
    return entity.toJSON();
  }
}
