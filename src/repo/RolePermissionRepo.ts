
export interface RolePermissionRepo {
    findAllByRoleIds(ids: number[]): Promise<number[]>;
}