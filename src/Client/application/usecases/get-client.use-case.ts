import ClientRepository from "../../domain/repository/client.repository";
import { ClientOutput, ClientOutputMapper } from "../dto/client-output";
import { default as DefaultUseCase } from "../../../shared/usecases/use-case";

export namespace GetClientUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private clientRepo: ClientRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.clientRepo.findById(input.id);
      return ClientOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = ClientOutput;
}

export default GetClientUseCase;

//request e response http
//dados - Client - dados de saida

//UseCase -> domain

//infra -> domain
