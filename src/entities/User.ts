import {Role} from "./Role";
import {Permission} from "./Permission";

export class User {
    private readonly id: number;
    private name: string;
    private username: string;
    private password: string;

    private roles: Role[] = [];
    private permissions: Permission[] = [];

    constructor(id: number, name: string, username: string, password: string) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
    }

    public getUserName(): string {
        return this.username;
    }

    public getPassword(): string {
        return this.password + "encoding:)";
    }

    public changePassword(newPassword: string): void {
        this.password = newPassword;
    }

    public changeUsername(newUsername: string): void {
        this.username = newUsername;
    }

    public getId(){
        return this.id;
    }

    public getName(){
        return this.name;
    }

    public changeName(name: string) {
        this.name = name;
    }

    public getRoles(){
        return this.roles;
    }

    public getRoleNames(): string[]{
        return this.roles.map(role => role.getName());
    }
    public getPermissionNames(): string[]{
        return this.permissions.map(permission => permission.getName());
    }

    public getPermissions(){
        return this.permissions;
    }

    public addRole(role: Role){
        this.roles.push(role);
    }

    public addRoles(roles: Role[]){
        this.roles = roles;
    }

    public addPermission(permission: Permission){
        this.permissions.push(permission);
    }

    public addPermissions(permissions: Permission[]){
        this.permissions = permissions;
    }
}