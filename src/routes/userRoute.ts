import {UserController} from "../controllers/UserController";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {Router} from "express";

export function userRoutes(
    userController: UserController,
    authMiddleware: AuthMiddleware
) {
    const router = Router();

    router.use(authMiddleware.handle);

    router.get("/", userController.index.bind(userController));
    router.get("/:id", userController.getUserById.bind(userController));

    return router;
}