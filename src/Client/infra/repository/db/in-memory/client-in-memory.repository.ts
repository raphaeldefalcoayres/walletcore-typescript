import { SortDirection } from "../../../../../shared/repository/repository-contracts";
import ClientRepository from "../../../../domain/repository/client.repository";
import { InMemorySearchableRepository } from "../../../../../shared/repository/in-memory-repository";
import Client from "Client/domain/entities/client";

export class ClientInMemoryRepository
  extends InMemorySearchableRepository<Client>
  implements ClientRepository.Repository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: Client[],
    filter: ClientRepository.Filter
  ): Promise<Client[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: Client[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Promise<Client[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}

export default ClientInMemoryRepository;
//validação
//implementar uma ordenação, ordenar por created_at
//testar filtro + ordenação
