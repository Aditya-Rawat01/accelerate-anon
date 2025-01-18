import express, { json } from 'express'
import { authMiddleware } from '../auth/authMiddleware'
import { prisma } from '..'
import { dashboardSchema } from '../zodSchema'

export const dashboardRouter=express.Router()

type dashboardType= {
    streakDate?:number
}
dashboardRouter.get("/",authMiddleware,async(req,res)=>{
    try {
       const userDash=await prisma.dashboard.findFirst({
        where:{
        userId:parseInt(req.id)
        }, 
        select:{
            user:true,
            completedActivities:true,
            streak:true,
            streakDate:true
        }
 })
    res.json({
        "msg":userDash
    }) 
    } catch (error) {
      res.status(500).json({
        "msg":"Server Error/ User doesn't exists"
      })  
    }
    
})
dashboardRouter.post("/update",authMiddleware,async(req,res)=>{
    const {streakDate} = req.body
    const parsedSchema=dashboardSchema.safeParse({streakDate})
    if (!parsedSchema.success) {
        res.status(403).json({
            "msg":"Invalid entries"
        })
    } else {                            // streak can be updated by using lastUpdatedAt (maybe)
        try {
            const dash=await prisma.dashboard.update({
                where:{
                    userId:parseInt(req.id)
                },
                data:{
                    streakDate:streakDate
                }
            })
            res.json({
                "msg":dash
            })  
        } catch (error) {
            res.json({
                "msg":"Error occured while fetching dashboard"
            })
        }
        
    }
    
})

dashboardRouter.post("/unsubscribeEmail",authMiddleware,async(req,res)=>{
    try {
      await prisma.user.update({
        where:{
            id:parseInt(req.id)
        },
        data:{
            receiveEmail:false
        }
    })
    res.json({
        "msg":"Unsubscribed Successfully"
    }) 
     
    } catch (error) {
        res.status(500).json({
            "msg":"Server Error"
        })
    }
    
})

