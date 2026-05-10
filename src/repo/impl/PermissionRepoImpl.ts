import {PermissionRepo} from "../PermissionRepo";
import {Permission} from "../../entities/Permission";

export class PermissionRepoImpl implements PermissionRepo{

    private readonly database: {id: number, name: string}[];

    constructor(database: {id: number, name: string}[]) {
        this.database = database;
    }

    async findAllByIds(ids: number[]): Promise<Permission[]> {

      const data = this.database
        .filter(p => ids.includes(p.id))
        .map(p => new Permission(p.id, p.name))

        return Promise.resolve(data)
    }

    async findAll(): Promise<Permission[]> {
        const permissions: Permission[] = this.database.map((value: { id: number, name:string }) => new Permission(value.id, value.name));
        return Promise.resolve(permissions);
    }

    async findOne(id: number): Promise<Permission | null> {

        const user = this.database.find(
            (value: { id: number, name: string }) => value.id === id);

        if(!user) {
            return null;
        }

        return Promise.resolve(new Permission(user.id,user.name));
    }
}