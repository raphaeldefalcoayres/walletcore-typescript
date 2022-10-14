import Transaction from "../entities/transaction";
import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from "#shared/repository/repository-contracts";

export namespace TransactionRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Transaction, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Transaction,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default TransactionRepository;
