import express, { NextFunction, Request, Response } from 'express'
import { userSignin } from '../zodSchema'
import jwt from 'jsonwebtoken'

export const signinRouter=express.Router()

function signinMiddleware(req:Request, res:Response, next:NextFunction) {
    const { email, password}=req.body
    const validRes=userSignin.safeParse({email, password})
    if (!validRes.success) {
        res.status(411).json({
            "msg":validRes.error.issues
        })
    }
    else {
                const token=jwt.sign({email},process.env.JWT_SECRET as string)
                req.token=token
                next()
        next()
    }
}


signinRouter.post("/",signinMiddleware,(req,res)=>{
    res.json({
    
        "msg":"Reached here",
        "token":req.token
    }
    )
})