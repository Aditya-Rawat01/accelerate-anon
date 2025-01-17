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
         req.id=newUser.id as unknown as string
         const token=jwt.sign({id:req.id},process.env.JWT_SECRET as string,{
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


signupRouter.post("/",signupMiddleware,async(req,res)=>{
    try {
        const today = new Date();
        const yesterday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 1));
      const dash=await prisma.dashboard.create({
        data:{
            streak:0,
            userId:parseInt(req.id),
            streakDate:yesterday
        }
      })
      res.json({
        "token":req.token,
        "dashboard":dash
      })  
    } catch (error) {
        res.status(500).json({
            "msg":"Error while signing up.Try again"
          })
    }
    
})


/// there should be delete account api which delete the user, dashboard, activity adn dont send emails to them