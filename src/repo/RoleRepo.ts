import {Role} from "../entities/Role";
import {SimpleRepo} from "./SimpleRepo";

export interface RoleRepo extends SimpleRepo{
    create(role: Role): Promise<Role | null>;
    findAllByIds(ids: number[]): Promise<Role[]>;
}