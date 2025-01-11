import express, { NextFunction, Request, Response } from 'express'
import { userSignin } from '../zodSchema'
import jwt from 'jsonwebtoken'
import { prisma } from '..'

export const signinRouter=express.Router()

async function signinMiddleware(req:Request, res:Response, next:NextFunction) {
    const { email, password}=req.body
    const validRes=userSignin.safeParse({email, password})
    if (!validRes.success) {
        res.status(411).json({
            "msg":validRes.error.issues
        })
    }
    else {
            const userExists=await prisma.user.findFirst({
                    where:{
                        email,
                        password
                    }
                })
            if (userExists) {
                const token=jwt.sign({email},process.env.JWT_SECRET as string)
                req.token=token
                next()
            }
            else {
                res.status(403).json({
                    "msg":"Email don't exists. Try signing up"
                })
            }
            
    }
}


signinRouter.post("/",signinMiddleware,(req,res)=>{
    res.json({
    
        "msg":"Signed in successfully",
        "token":req.token
    }
    )
})