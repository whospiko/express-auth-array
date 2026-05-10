import {RoleService} from "../RoleService";
import {Role} from "../../entities/Role";
import {RoleRepo} from "../../repo/RoleRepo";

export class RoleServiceImpl implements RoleService{

    private roleRepo: RoleRepo;

    public constructor(userRepo: RoleRepo) {
        this.roleRepo = userRepo;
    }


    public async getAllRoles(): Promise<Role[]> {
        return await this.roleRepo.findAll();
    }
}