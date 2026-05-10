import {SimpleRepo} from "./SimpleRepo";
import {Permission} from "../entities/Permission";


export interface PermissionRepo extends SimpleRepo{
    findAllByIds(ids: number[]): Promise<Permission[]>;
}