import ClientRepository from "../../domain/repository/client.repository";
import { ClientOutput } from "../dto/client-output";
import { default as DefaultUseCase } from "../../../shared/usecases/use-case";
export declare namespace GetClientUseCase {
    class UseCase implements DefaultUseCase<Input, Output> {
        private clientRepo;
        constructor(clientRepo: ClientRepository.Repository);
        execute(input: Input): Promise<Output>;
    }
    type Input = {
        id: string;
    };
    type Output = ClientOutput;
}
export default GetClientUseCase;
