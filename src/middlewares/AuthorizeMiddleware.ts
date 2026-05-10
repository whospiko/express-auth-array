import {NextFunction, Response} from "express";
import {AuthRequest} from "./AuthRequest";

export class AuthorizeMiddleware {

    authorize({ roles = [], permissions = [] }: {roles: string[], permissions: string[]}) {
      return (req: AuthRequest, res: Response, next: NextFunction): any => {

        const user = req.user

        console.log("Logging [AuthorizeMiddleware]", user)

      if (!user) {
            return res.status(401).json({ message: 'Not authenticated' })
      }

    const hasRole =
      roles.length === 0 || roles.some(r => user.roles.includes(r))

    const hasPermission =
      permissions.length === 0 ||
      permissions.some(p => user.permissions.includes(p))


        if (!hasRole && !hasPermission) {
          return res.status(403).json({
            message: 'Forbidden: access denied'
          })
        }

        next()
      }
    }

}