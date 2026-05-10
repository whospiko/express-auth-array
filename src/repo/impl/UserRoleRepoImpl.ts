import {UserRoleRepo} from "../UserRoleRepo";



export class UserRoleRepoImpl implements UserRoleRepo {

    private readonly database: {userId: number, roleId: number}[];

    constructor(database: {userId: number, roleId: number}[]) {
        this.database = database;
    }

    findAllByUserId(id: number): Promise<number[]> {

        const data = this.database
                                .filter(ur => ur.userId === id)
                                .map(ur => ur.roleId)

        return Promise.resolve(data);
    }

}