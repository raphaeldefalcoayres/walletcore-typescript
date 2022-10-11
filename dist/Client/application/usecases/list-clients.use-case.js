"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoriesUseCase = void 0;
const client_repository_1 = require("../../domain/repository/client.repository");
const client_output_1 = require("../dto/client-output");
const pagination_output_1 = require("../../../shared/dto/pagination-output");
var ListCategoriesUseCase;
(function (ListCategoriesUseCase) {
    class UseCase {
        constructor(clientRepo) {
            this.clientRepo = clientRepo;
        }
        async execute(input) {
            const params = new client_repository_1.ClientRepository.SearchParams(input);
            const searchResult = await this.clientRepo.search(params);
            return this.toOutput(searchResult);
        }
        toOutput(searchResult) {
            const items = searchResult.items.map((i) => {
                return client_output_1.ClientOutputMapper.toOutput(i);
            });
            return pagination_output_1.PaginationOutputMapper.toOutput(items, searchResult);
        }
    }
    ListCategoriesUseCase.UseCase = UseCase;
})(ListCategoriesUseCase = exports.ListCategoriesUseCase || (exports.ListCategoriesUseCase = {}));
exports.default = ListCategoriesUseCase;
