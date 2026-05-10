import {RolePermissionRepo} from "../RolePermissionRepo";

export class RolePermissionRepoImpl implements RolePermissionRepo{

    private readonly database: { roleId: number, permissionId: number }[];

    constructor(database: { roleId: number, permissionId: number }[]) {
        this.database = database;
    }

    findAllByRoleIds(ids: number[]): Promise<number[]> {

        const data = this.database
            .filter(rp => ids.includes(rp.roleId))
            .map(rp => rp.permissionId)

        return Promise.resolve(data);
    }
}