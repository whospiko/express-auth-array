import {FakeProductController} from "../controllers/FakeProductController";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {AuthorizeMiddleware} from "../middlewares/AuthorizeMiddleware";
import {Router} from "express";

export function productRoutes(
    productController: FakeProductController,
    authMiddleware: AuthMiddleware,
    authorizeMiddleware: AuthorizeMiddleware
) {
    const router = Router();

    router.get("/", productController.index);

    router.post(
        "/",
        authMiddleware.handle,
        authorizeMiddleware.authorize({
            roles: ["admin"],
            permissions: ["create:user"]
        }),
        productController.createProduct
    );

    return router;
}