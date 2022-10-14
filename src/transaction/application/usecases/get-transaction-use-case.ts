import { TransactionRepository } from "#transaction/domain";
import { default as DefaultUseCase } from "#shared/usecases/use-case";
import { TransactionOutput, TransactionOutputMapper } from "../dto";

export namespace GetTransactionUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private transactionRepo: TransactionRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.transactionRepo.findById(input.id);
      return TransactionOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = TransactionOutput;
}

export default GetTransactionUseCase;

//request e response http
//dados - Transaction - dados de saida

//UseCase -> domain

//infra -> domain
