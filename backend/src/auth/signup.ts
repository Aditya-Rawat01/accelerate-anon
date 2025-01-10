import express, { NextFunction, Request, Response } from 'express'
import { userSignup } from '../zodSchema'
import jwt from 'jsonwebtoken'
export const signupRouter=express.Router()

function signupMiddleware(req:Request, res:Response, next:NextFunction) {
    const {username, email, password}=req.body
    const validRes=userSignup.safeParse({username, email, password})
    if (!validRes.success) {
        res.status(411).json({
            "msg":validRes.error.issues
        })
    }
    else {
        
        const token=jwt.sign({email},process.env.JWT_SECRET as string)
        req.token=token
        next()
    }
}


signupRouter.post("/",signupMiddleware,(req,res)=>{
    res.json({
    
        "msg":"Reached here",
        "token":req.token
    }
    )
})