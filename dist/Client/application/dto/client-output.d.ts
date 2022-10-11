import Client from "../../domain/entities/client";
export declare type ClientOutput = {
    id: string;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
};
export declare class ClientOutputMapper {
    static toOutput(entity: Client): ClientOutput;
}
