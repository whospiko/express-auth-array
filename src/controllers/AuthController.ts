import {Request, Response} from "express";
import {HttpStatus} from "../enums/HttpStatus";
import {AuthService} from "../services/AuthService";

export class AuthController{

    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public async login(req: Request, res: Response) {
        console.log("Test")

        const {username, password} = req.body;

        if(!username || !password) {
            throw new Error("Username or Password is required");
        }

        const token = await this.authService.login(username, password);

        res.status(HttpStatus.OK).json({
            data: {"token": token},
            message: "Login successfully",
        });
    }
}