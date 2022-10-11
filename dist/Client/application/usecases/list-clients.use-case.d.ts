import { ClientRepository } from "../../domain/repository/client.repository";
import { ClientOutput } from "../dto/client-output";
import { default as DefaultUseCase } from "../../../shared/usecases/use-case";
import { SearchInputDto } from "../../../shared/dto/search-input";
import { PaginationOutputDto } from "../../../shared/dto/pagination-output";
export declare namespace ListCategoriesUseCase {
    class UseCase implements DefaultUseCase<Input, Output> {
        private clientRepo;
        constructor(clientRepo: ClientRepository.Repository);
        execute(input: Input): Promise<Output>;
        private toOutput;
    }
    type Input = SearchInputDto;
    type Output = PaginationOutputDto<ClientOutput>;
}
export default ListCategoriesUseCase;
