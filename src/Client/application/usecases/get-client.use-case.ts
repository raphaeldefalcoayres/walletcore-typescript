import { ClientRepository } from "#client/domain";
import { default as DefaultUseCase } from "#shared/usecases/use-case";
import { UniqueEntityId } from "#shared/value-objects";
import { ClientOutput, ClientOutputMapper } from "../dto";

export namespace GetClientUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private clientRepo: ClientRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.clientRepo.findById(input.id);
      return ClientOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: UniqueEntityId;
  };

  export type Output = ClientOutput;
}

export default GetClientUseCase;

//request e response http
//dados - Client - dados de saida

//UseCase -> domain

//infra -> domain
