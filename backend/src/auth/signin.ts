import express, { NextFunction, Request, Response } from 'express'
import { userSignin } from '../zodSchema'
import jwt from 'jsonwebtoken'
import { prisma } from '..'

export const signinRouter=express.Router()

async function signinMiddleware(req:Request, res:Response, next:NextFunction) {
    const {email, password}=req.body
    const validRes=userSignin.safeParse({email, password})
    if (!validRes.success) {
        res.status(411).json({
            "msg":validRes.error.issues
        })
    }
    else {
        try {
            const userExists=await prisma.user.findFirst({
                where:{
                    email
                }
            })
        if (userExists && userExists.password===password) {
            const id=userExists.id
            const token=jwt.sign({id},process.env.JWT_SECRET as string,{
                expiresIn:'7d'
            })
            req.id=id as unknown as string
            req.token=token
            req.receiveEmail=userExists.receiveEmail
            next()
        } else if (userExists?.password!==password && userExists) {
            res.status(403).json({
                "msg":"Wrong password! Try Again"
            })
        }
        else {
            res.status(404).json({
                "msg":"Email don't exists. Try signing up"
            })
        }
        } catch (error) {
            res.status(500).json({
                "msg":"Server error."
            })
        }
            
            
    }
}


signinRouter.post("/",signinMiddleware,async(req,res)=>{
    if (!req.receiveEmail) {
     await prisma.user.update({
        where:{
            id:parseInt(req.id)
        },
        data:{
            receiveEmail:true
        }
    })   
    }
    
    res.json({
    
        "msg":"Signed in successfully",
        "token":req.token
    }
    )
})