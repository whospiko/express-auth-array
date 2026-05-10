import {Role} from "../entities/Role";

export interface RoleService{
    getAllRoles(): Promise<Role[]>;
}