export default abstract class Entity<Props = any> {
    readonly props: Props;
    readonly uuid: string;
    constructor(props: Props, id?: string);
    private idValidate;
    get id(): string;
    toJSON(): Required<{
        id: string;
    } & Props>;
}
