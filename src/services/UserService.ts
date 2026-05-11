import {User} from "../entities/User";

export interface UserService{
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserByUsernameAndPassword(username: string, password: string): Promise<User>;
}