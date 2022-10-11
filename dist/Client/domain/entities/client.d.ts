import Entity from "../../../shared/entities/entity";
export declare type ClientProperties = {
    name: string;
    email: string;
    created_at?: Date;
    updated_at?: Date;
};
export default class Client extends Entity<ClientProperties> {
    readonly props: ClientProperties;
    constructor(props: ClientProperties, id?: string);
    update(name: string, email: string): void;
    get name(): string;
    get email(): string;
    get created_at(): Date;
    get updated_at(): Date;
    private set name(value);
    private set email(value);
    static validate(props: ClientProperties): void;
}
