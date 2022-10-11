import { ClientOutput } from "../dto/client-output";
import { default as DefaultUseCase } from "../../../shared/usecases/use-case";
import ClientRepository from "../../domain/repository/client.repository";
export declare namespace UpdateClientUseCase {
    class UseCase implements DefaultUseCase<Input, Output> {
        private clientRepo;
        constructor(clientRepo: ClientRepository.Repository);
        execute(input: Input): Promise<Output>;
    }
    type Input = {
        id: string;
        name: string;
        email: string;
    };
    type Output = ClientOutput;
}
export default UpdateClientUseCase;
