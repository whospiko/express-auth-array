import {User} from "../../entities/User";
import {UserRepo} from "../UserRepo";

type UserData = {id: number, name: string, username: string, password: string}

export class UserRepoImpl implements UserRepo {

    private readonly database: UserData[];

    constructor(database: UserData[]) {
        this.database = database;
    }

    async findByUsernameAndPassword(username: string, password: string): Promise<User | null> {

        const user = this.database.find(
            u => u.username === username && u.password === password
          )

        if(!user){
            return null
        }

        return Promise.resolve(new User(user.id,user.name, user.username, user.password));
    }

    async create(user: User): Promise<User | null> {

        const isAlreadyExist = this.findOne(user.getId());

        if(isAlreadyExist !== null){
            return null;
        }

        this.database.push({id: user.getId(), name: user.getName(), username: user.getUserName(),password: user.getPassword()});

        return Promise.resolve(user);
    }

    async findAll(): Promise<User[]> {
        const users: User[] = this.database.map((value: UserData) => new User(value.id, value.name, value.username, value.password));
        return Promise.resolve(users);
    }

    async  findOne(id: number): Promise<User | null> {
        const user = this.database.find(
            (value: { id: number, name: string }
            ) => value.id === id);

        if(!user) {
            return null;
        }

        return Promise.resolve(new User(user.id,user.name,user.username,user.password));
    }
}