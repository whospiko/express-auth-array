import {NextFunction, RequestHandler, Response} from "express";
import {AuthRequest} from "./AuthRequest";
import {fakeVerify} from "../configs/FakeJwt";


export class AuthMiddleware{


    public handle: RequestHandler = async (req: AuthRequest, res: Response, next: NextFunction) =>  {

          const authHeader = req.headers.authorization

          if (!authHeader) {
              res.status(401).json({ message: 'Missing auth token' })
              return;
          }

            const token = authHeader.split(' ')[1]

            if(token === undefined){
                res.status(401).json({ message: 'Invalid token provided' })
                return;
            }
            try{
                const decoded = fakeVerify(token)
                req.user = {
                    id: decoded.id,
                    roles: decoded.roles,
                    permissions: decoded.permissions
                }
                next()
            } catch(err: any) {
                res.status(401).json({message: 'Invalid token'})
                return;
            }
}}