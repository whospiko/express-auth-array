export interface UserRoleRepo{
    findAllByUserId(id: number): Promise<number[]>;
}