import {UserService} from "../services/UserService";
import {Request, Response} from "express";
import {HttpStatus} from "../enums/HttpStatus";

export class AuthController{

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async login(req: Request, res: Response) {
        console.log("Test")

        const {username, password} = req.body;

        if(!username || !password) {
            throw new Error("Username or Password is required");
        }

        const token = await this.userService.login(username, password);

        res.status(HttpStatus.OK).json({
            data: {"token": token},
            message: "Login successfully",
        });
    }
}