import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
export function authMiddleware(req:Request, res:Response,next:NextFunction) {
    const token=req.headers.authorization
    if (token) {
        try {
          const tokenDecoded=jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload
          req.id=tokenDecoded.id
          next() 
        } catch (error) {
            res.status(403).json({
                "msg":"Invalid token"
            }) 
        }
        
    }
    else {
        res.status(411).json({
            "msg":"Token required"
        })
    }
    

}