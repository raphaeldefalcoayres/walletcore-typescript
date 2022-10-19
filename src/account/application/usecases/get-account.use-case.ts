import { AccountRepository } from "#account/domain";
import { default as DefaultUseCase } from "#shared/usecases/use-case";
import { UniqueEntityId } from "#shared/value-objects";
import { AccountOutput, AccountOutputMapper } from "../dto";

export namespace GetAccountUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private accountRepo: AccountRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.accountRepo.findById(input.id);
      return AccountOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: UniqueEntityId;
  };

  export type Output = AccountOutput;
}

export default GetAccountUseCase;

//request e response http
//dados - Account - dados de saida

//UseCase -> domain

//infra -> domain
