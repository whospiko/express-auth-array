import {AuthService} from "../AuthService";
import {UserService} from "../UserService";
import {fakeSign} from "../../configs/FakeJwt";

export class AuthServiceImpl implements AuthService {
    private userService: UserService;
    constructor(userService: UserService) {
        this.userService = userService;
    }


    async login(username: string, password: string): Promise<string> {
        const user =await this.userService.getUserByUsernameAndPassword(username, password);

        if(!user) {
            throw new Error("User not found");
        }

        const detail =  await this.userService.getUserById(user.getId())

        return fakeSign({
            id: detail.getId(),
            roles: detail.getRoleNames(),
            permissions: detail.getPermissionNames()
        });
    }

}