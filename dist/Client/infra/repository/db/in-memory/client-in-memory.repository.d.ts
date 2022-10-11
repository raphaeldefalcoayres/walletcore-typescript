import { SortDirection } from "../../../../../shared/repository/repository-contracts";
import ClientRepository from "../../../../domain/repository/client.repository";
import { InMemorySearchableRepository } from "../../../../../shared/repository/in-memory-repository";
import Client from "Client/domain/entities/client";
export declare class ClientInMemoryRepository extends InMemorySearchableRepository<Client> implements ClientRepository.Repository {
    sortableFields: string[];
    protected applyFilter(items: Client[], filter: ClientRepository.Filter): Promise<Client[]>;
    protected applySort(items: Client[], sort: string | null, sort_dir: SortDirection | null): Promise<Client[]>;
}
export default ClientInMemoryRepository;
