import { TransactionRepository } from "#transaction/domain";
import { default as DefaultUseCase } from "#shared/usecases/use-case";
import { TransactionOutput, TransactionOutputMapper } from "../dto";

export namespace UpdateTransactionUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private transactionRepo: TransactionRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.transactionRepo.findById(input.id);
      entity.update();

      await this.transactionRepo.update(entity);

      return TransactionOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = TransactionOutput;
}

export default UpdateTransactionUseCase;

//dados - Transaction - dados de saida

//UseCase -> domain

//infra -> domain
