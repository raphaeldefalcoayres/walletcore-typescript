"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepository = void 0;
const repository_contracts_1 = require("../../../shared/repository/repository-contracts");
var ClientRepository;
(function (ClientRepository) {
    class SearchParams extends repository_contracts_1.SearchParams {
    }
    ClientRepository.SearchParams = SearchParams;
    class SearchResult extends repository_contracts_1.SearchResult {
    }
    ClientRepository.SearchResult = SearchResult;
})(ClientRepository = exports.ClientRepository || (exports.ClientRepository = {}));
exports.default = ClientRepository;
