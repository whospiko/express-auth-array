import {OrderController} from "../controllers/OrderController";
import {Router} from "express";

export function orderRoute(
    orderController: OrderController,
) {
    const router = Router();

    router.get("/", orderController.getAllOrders.bind(orderController));

    return router;
}