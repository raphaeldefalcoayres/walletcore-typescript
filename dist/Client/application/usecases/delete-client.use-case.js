"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClientUseCase = void 0;
var DeleteClientUseCase;
(function (DeleteClientUseCase) {
    class UseCase {
        constructor(clientRepository) {
            this.clientRepository = clientRepository;
        }
        async execute(input) {
            await this.clientRepository.delete(input.id);
        }
    }
    DeleteClientUseCase.UseCase = UseCase;
})(DeleteClientUseCase = exports.DeleteClientUseCase || (exports.DeleteClientUseCase = {}));
exports.default = DeleteClientUseCase;
