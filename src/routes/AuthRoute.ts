import {Router} from "express";
import {AuthController} from "../controllers/AuthController";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";

export function authRoutes(
    authController: AuthController,
    authMiddleware: AuthMiddleware,
) {
    const router = Router();

    router.post("/login", authController.login.bind(authController));

    router.use(authMiddleware.handle);


    return router;
}