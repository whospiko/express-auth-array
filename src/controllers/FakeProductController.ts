import {Request,Response} from "express";
import {HttpStatus} from "../enums/HttpStatus";


export class FakeProductController {
    public index(req: Request, res: Response): void {

        const data = [
            {id:1, name: "Product 1"},
            {id:1, name: "Product 2"},
        ]

        res.status(HttpStatus.OK).json(data)
    }

    public createProduct(req: Request, res: Response): void {
        res.status(HttpStatus.CREATED).json(req.body)
    }
}