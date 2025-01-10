import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
export function authMiddleware(req:Request, res:Response,next:NextFunction) {
    const token=req.headers.authorization
    if (token) {
        try {
          jwt.verify(token,process.env.JWT_SECRET as string) 
        
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