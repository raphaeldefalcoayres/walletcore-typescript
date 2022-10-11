"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientUseCase = void 0;
const client_output_1 = require("../dto/client-output");
var UpdateClientUseCase;
(function (UpdateClientUseCase) {
    class UseCase {
        constructor(clientRepo) {
            this.clientRepo = clientRepo;
        }
        async execute(input) {
            const entity = await this.clientRepo.findById(input.id);
            entity.update(input.name, input.email);
            await this.clientRepo.update(entity);
            return client_output_1.ClientOutputMapper.toOutput(entity);
        }
    }
    UpdateClientUseCase.UseCase = UseCase;
})(UpdateClientUseCase = exports.UpdateClientUseCase || (exports.UpdateClientUseCase = {}));
exports.default = UpdateClientUseCase;
