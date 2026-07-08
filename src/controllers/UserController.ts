import {Request, Response} from "express";
import {UserService} from "../services/UserService";
import {HttpStatus} from "../enums/HttpStatus";

export class UserController{

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async index(req: Request, res: Response) {

        const result = await this.userService.getAllUsers();

        res.status(HttpStatus.OK).json({
            data: result,
            message: "User index was successfully."
        });
    }

    public async getUserById(req: Request, res: Response) {
        const {id} = req.params;

        const result = await this.userService.getUserById( Number(id) );

        res.status(HttpStatus.OK).json({
            data: result,
            message: "User found."
        })
    }
}