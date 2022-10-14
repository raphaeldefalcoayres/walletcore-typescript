import Account from "#account/domain/entities/account";
import Client from "#client/domain/entities/client";

export type AccountOutput = {
  id: string;
  client: Client;
  accounts?: Account[];
  balance: number;
  created_at: Date;
  updated_at: Date;
};

export class AccountOutputMapper {
  static toOutput(entity: Account): AccountOutput {
    return entity.toJSON();
  }
}
