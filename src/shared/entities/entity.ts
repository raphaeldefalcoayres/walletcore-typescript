import { v4 as uuid, validate } from "uuid";

export default abstract class Entity<Props = any> {
  public readonly uuid: string;
  constructor(public readonly props: Props, id?: string) {
    this.uuid = id || uuid();
    this.idValidate();
  }

  private idValidate() {
    const isValid = validate(this.uuid);
    if (!isValid) {
      throw new Error("Id must be a valid UUID v4");
    }
  }

  get id(): string {
    return this.uuid;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
