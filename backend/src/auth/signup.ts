import express, { NextFunction, Request, Response } from 'express'
import { userSignup } from '../zodSchema'

export const signupRouter=express.Router()

function signupMiddleware(req:Request, res:Response, next:NextFunction) {
    const {username, email, password}=req.body
    const validRes=userSignup.safeParse({username, email, password})
    if (!validRes.success) {
        res.status(411).json({
            "msg":validRes.error
        })
    }
    else {
        next()
    }
}


signupRouter.post("/",signupMiddleware,(req,res)=>{
    res.json({
    
        "msg":"Reached here"
    }
    )
})