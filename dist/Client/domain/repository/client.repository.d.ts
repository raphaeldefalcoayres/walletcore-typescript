import Client from "../entities/client";
import { SearchableRepositoryInterface, SearchParams as DefaultSearchParams, SearchResult as DefaultSearchResult } from "../../../shared/repository/repository-contracts";
export declare namespace ClientRepository {
    type Filter = string;
    class SearchParams extends DefaultSearchParams<Filter> {
    }
    class SearchResult extends DefaultSearchResult<Client, Filter> {
    }
    interface Repository extends SearchableRepositoryInterface<Client, Filter, SearchParams, SearchResult> {
    }
}
export default ClientRepository;
