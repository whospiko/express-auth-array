import {UserService} from "../UserService";
import {UserRepo} from "../../repo/UserRepo";
import {User} from "../../entities/User";
import {RoleRepo} from "../../repo/RoleRepo";
import {UserRoleRepo} from "../../repo/UserRoleRepo";
import {PermissionRepo} from "../../repo/PermissionRepo";
import {RolePermissionRepo} from "../../repo/RolePermissionRepo";
import {fakeSign} from "../../configs/FakeJwt";

export class UserServiceImpl implements UserService {

    private userRepo: UserRepo;
    private roleRepo: RoleRepo;
    private permissionRepo: PermissionRepo;
    private userRoleRepo: UserRoleRepo;
    private rolePermissionRepo: RolePermissionRepo;


    public constructor(userRepo: UserRepo, roleRepo: RoleRepo, permissionRepo: PermissionRepo,userRoleRepo: UserRoleRepo, rolePermissionRepo: RolePermissionRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.permissionRepo = permissionRepo;
        this.userRoleRepo = userRoleRepo;
        this.rolePermissionRepo = rolePermissionRepo;
    }

    async login(username: string, password: string): Promise<string> {
        const user: User|null = await this.userRepo.findByUsernameAndPassword(username, password);

        if(!user) {
            throw new Error("User not found");
        }

        const detail =  await this.getUserById(user.getId())

        return fakeSign({
            id: detail.getId(),
            roles: detail.getRoleNames(),
            permissions: detail.getPermissionNames()
        });
    }

    async getUserById(id: number): Promise<User> {

        const user: User = await this.userRepo.findOne(id);

        if(!user) {
            throw new Error("User not found");
        }

        const userRoleIds = await this.userRoleRepo.findAllByUserId(user.getId());
        const roles = await this.roleRepo.findAllByIds(userRoleIds);
        const permissionRoleIds = await this.rolePermissionRepo.findAllByRoleIds(userRoleIds);
        const permissions = await this.permissionRepo.findAllByIds(permissionRoleIds);

        user.addRoles(roles);
        user.addPermissions(permissions);

        return user;
    }

    public async getAllUsers(): Promise<User[]> {
       return await this.userRepo.findAll();
    }
}