import {UserRepo} from "./repo/UserRepo";
import {UserRepoImpl} from "./repo/impl/UserRepoImpl";
import {permissions, rolePermissions, roles, userRoles, users} from "./configs/FakeDataConfig";
import {UserService} from "./services/UserService";
import {UserServiceImpl} from "./services/impl/UserServiceImpl";
import {UserController} from "./controllers/UserController";
import express from "express";
import {RoleRepo} from "./repo/RoleRepo";
import {RoleRepoImpl} from "./repo/impl/RoleRepoImpl";
import {UserRoleRepo} from "./repo/UserRoleRepo";
import {UserRoleRepoImpl} from "./repo/impl/UserRoleRepoImpl";
import {PermissionRepo} from "./repo/PermissionRepo";
import {PermissionRepoImpl} from "./repo/impl/PermissionRepoImpl";
import {RolePermissionRepo} from "./repo/RolePermissionRepo";
import {RolePermissionRepoImpl} from "./repo/impl/RolePermissionRepoImpl";
import {AuthMiddleware} from "./middlewares/AuthMiddleware";
import {AuthorizeMiddleware} from "./middlewares/AuthorizeMiddleware";
import {FakeProductController} from "./controllers/FakeProductController";
import {userRoutes} from "./routes/userRoute";
import {productRoutes} from "./routes/ProductRoute";
import {authRoutes} from "./routes/AuthRoute";
import {AuthController} from "./controllers/AuthController";


export async function Bootstrap() {
    // Repository Boot
    const userRepo: UserRepo = new UserRepoImpl(users)
    const roleRepo: RoleRepo = new RoleRepoImpl(roles)
    const permissionRepo: PermissionRepo = new PermissionRepoImpl(permissions)
    const userRoleRepo: UserRoleRepo = new UserRoleRepoImpl(userRoles)
    const rolePermission: RolePermissionRepo = new RolePermissionRepoImpl(rolePermissions)

    // Service Boot
    const userService: UserService = new UserServiceImpl(userRepo, roleRepo, permissionRepo, userRoleRepo, rolePermission);

    // Controller Boot
    const userController: UserController = new UserController(userService);
    const authController: AuthController = new AuthController(userService);
    const productController: FakeProductController = new FakeProductController();

    // Boot Middleware
    const authMiddleware: AuthMiddleware = new AuthMiddleware(userService)
    const authorizeMiddleware: AuthorizeMiddleware = new AuthorizeMiddleware()

    const app = express();

    const port = process.env.PORT || 8080;

    app.use(express.json());

    // Routes
    app.use("/auth", authRoutes(authController, authMiddleware))
    app.use("/users", userRoutes(userController, authMiddleware));
    app.use("/products", productRoutes(productController, authMiddleware, authorizeMiddleware));


    app.listen(port, () => console.log(`Listening on port ${port}`));
}