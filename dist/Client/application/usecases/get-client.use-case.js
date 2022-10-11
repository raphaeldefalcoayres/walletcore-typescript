"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClientUseCase = void 0;
const client_output_1 = require("../dto/client-output");
var GetClientUseCase;
(function (GetClientUseCase) {
    class UseCase {
        constructor(clientRepo) {
            this.clientRepo = clientRepo;
        }
        async execute(input) {
            const entity = await this.clientRepo.findById(input.id);
            return client_output_1.ClientOutputMapper.toOutput(entity);
        }
    }
    GetClientUseCase.UseCase = UseCase;
})(GetClientUseCase = exports.GetClientUseCase || (exports.GetClientUseCase = {}));
exports.default = GetClientUseCase;
