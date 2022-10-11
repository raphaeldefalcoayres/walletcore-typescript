"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientOutputMapper = void 0;
class ClientOutputMapper {
    static toOutput(entity) {
        return entity.toJSON();
    }
}
exports.ClientOutputMapper = ClientOutputMapper;
