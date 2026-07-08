import {Request,Response} from "express";

type Order = {
    id: number;
    total: number;
    products: string[];
}

export class OrderController {

    private orderData: Order[] = [
      {id: 1, total: 0.1, products: ["shirt", "jean"]},
      {id: 2, total: 0.1, products: ["hat", "shirt"]}
    ]

    constructor() {
    }

    public getAllOrders(req: Request, res: Response) {
        res.json({
            data: this.orderData,
            message: "get all orders"
        })
    }

}