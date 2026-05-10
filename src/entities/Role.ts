
export class Role{
    private readonly id: number;
    private name: string;

    public constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public getId(){
        return this.id;
    }

    public getName(){
        return this.name;
    }

    public changeName(name: string) {
        this.name = name;
    }
}