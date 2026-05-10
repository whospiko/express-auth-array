import {User} from "../entities/User";
import {SimpleRepo} from "./SimpleRepo";

export interface UserRepo extends SimpleRepo {
    create(user: User): Promise<User | null>;
    findByUsernameAndPassword(username: string, password: string): Promise<User | null>;
}