import Entity from "./entity";

export type ClientProperties = {
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
};

export default class Client extends Entity<ClientProperties> {
  constructor(public readonly props: ClientProperties, id?: string) {
    super(props, id);
    this.props.created_at = this.created_at ?? new Date();
    this.props.updated_at = this.updated_at ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }
}
