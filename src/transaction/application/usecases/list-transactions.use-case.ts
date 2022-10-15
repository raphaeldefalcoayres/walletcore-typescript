import { default as DefaultUseCase } from "#shared/usecases/use-case";
import { SearchInputDto } from "#shared/dto/search-input";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "#shared/dto/pagination-output";
import { TransactionRepository } from "#transaction/domain";
import { TransactionOutput, TransactionOutputMapper } from "../dto";

export namespace ListTransactionUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private transactionRepo: TransactionRepository.Repository) {}
    //
    async execute(input: Input): Promise<Output> {
      const params = new TransactionRepository.SearchParams(input);
      const searchResult = await this.transactionRepo.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: TransactionRepository.SearchResult): Output {
      const items = searchResult.items.map((i) => {
        return TransactionOutputMapper.toOutput(i);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }

  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<TransactionOutput>;
}

export default ListTransactionUseCase;

//request e response http
//dados - Transaction - dados de saida

//UseCase -> domain

//infra -> domain
