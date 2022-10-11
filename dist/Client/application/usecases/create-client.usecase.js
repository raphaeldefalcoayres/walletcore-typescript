"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientUseCase = void 0;
const client_output_1 = require("../dto/client-output");
const client_1 = require("../../domain/entities/client");
var CreateClientUseCase;
(function (CreateClientUseCase) {
    class UseCase {
        constructor(clientRepo) {
            this.clientRepo = clientRepo;
        }
        async execute(input) {
            const entity = new client_1.default(input);
            await this.clientRepo.insert(entity);
            return client_output_1.ClientOutputMapper.toOutput(entity);
        }
    }
    CreateClientUseCase.UseCase = UseCase;
})(CreateClientUseCase = exports.CreateClientUseCase || (exports.CreateClientUseCase = {}));
exports.default = CreateClientUseCase;
