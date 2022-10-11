import { SearchResult } from "../../shared/repository/repository-contracts";
export declare type PaginationOutputDto<Item = any> = {
    items: Item[];
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
};
export declare class PaginationOutputMapper {
    static toOutput<Item = any>(items: Item[], result: SearchResult): PaginationOutputDto<Item>;
}
