import {RoleRepo} from "../RoleRepo";
import {Role} from "../../entities/Role";

export class RoleRepoImpl implements RoleRepo {

    private readonly database: {id: number, name: string}[];

    constructor(database: {id: number, name: string}[]) {
        this.database = database;
    }

    async findAllByIds(ids: number[]): Promise<Role[]> {

        const userRoles = this.database
            .filter(role => ids.includes(role.id))
            .map(role =>new Role(role.id, role.name));

        return Promise.resolve(userRoles);
    }

    async create(role: Role): Promise<Role | null> {

        const isAlreadyExist = this.findOne(role.getId());

        if(isAlreadyExist !== null){
            return null;
        }

        this.database.push({id: role.getId(), name: role.getName()});

        return Promise.resolve(role);
    }

    async findAll(): Promise<Role[]> {
        const roles: Role[] = this.database.map((value: { id: number, name:string }) =>new Role(value.id, value.name));
        return Promise.resolve(roles);
    }

    async  findOne(id: number): Promise<Role | null> {

        const user = this.database.find(
            (value: { id: number, name: string }
            ) => value.id === id);

        if(!user) {
            return null;
        }

        return Promise.resolve(new Role(user.id,user.name));
    }
}