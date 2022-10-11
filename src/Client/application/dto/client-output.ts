import Client from "../../domain/entities/client";

export type ClientOutput = {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};

export class ClientOutputMapper {
  static toOutput(entity: Client): ClientOutput {
    return entity.toJSON();
  }
}
