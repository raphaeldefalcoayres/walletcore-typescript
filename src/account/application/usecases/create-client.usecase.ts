import { ClientRepository } from "#client/domain";
import Client from "#client/domain/entities/client";
import { default as DefaultUseCase } from "#shared/usecases/use-case";
import { ClientOutput, ClientOutputMapper } from "../dto";

export namespace CreateClientUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private clientRepo: ClientRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = new Client(input);
      await this.clientRepo.insert(entity);
      return ClientOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    name: string;
    email: string;
  };

  export type Output = ClientOutput;
}

export default CreateClientUseCase;

//dados - Client - dados de saida

//UseCase -> domain

//infra -> domain
