import express, { NextFunction, Request, Response } from 'express'
import { userSignup } from '../zodSchema'
import jwt from 'jsonwebtoken'
import { prisma } from '..'
export const signupRouter=express.Router()

async function signupMiddleware(req:Request, res:Response, next:NextFunction) {
    const {username, email, password}=req.body
    const validRes=userSignup.safeParse({username, email, password})
    if (!validRes.success) {
        res.status(411).json({
            "msg":validRes.error.issues
        })
    }
    else {
        try {
            const newUser=await prisma.user.create({
           data:{
                username,
                email,
                password
            }    
         })
         const id=newUser.id
         const token=jwt.sign({id},process.env.JWT_SECRET as string,{
            expiresIn:'7d'
        })
            req.token=token
            next() 
        } catch (error) {
            res.status(409).json({
                "msg":"Email exists. Try signing in"
            })
        }   
    }
}


signupRouter.post("/",signupMiddleware,(req,res)=>{
    res.json({
    
        "msg":"Signed up successfully",
        "token":req.token
    }
    )
})