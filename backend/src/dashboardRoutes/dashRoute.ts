import express, { json } from 'express'
import { authMiddleware } from '../auth/authMiddleware'
import { prisma } from '..'
import { dashboardSchema } from '../zodSchema'

export const dashboardRouter=express.Router()

type dashboardType= {
    streak?:number
    completedActivities?:number
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
            streak:true
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
    const {completedActivities, streak} = req.body
    const parsedSchema=dashboardSchema.safeParse({completedActivities, streak})
    if (!parsedSchema.success) {
        res.status(403).json({
            "msg":"Invalid entries"
        })
    } else {
        const valuesToUpdate:dashboardType={}
        if (completedActivities) {
            valuesToUpdate.completedActivities=completedActivities
        }
        if (streak) {
            valuesToUpdate.streak=streak // entire streak and activities completed will have to be passed from frontend
        }                              // streak can be updated by using lastUpdatedAt (maybe)
        try {
            await prisma.dashboard.update({
                where:{
                    userId:parseInt(req.id)
                },
                data:valuesToUpdate
            })
            res.json({
                "msg":"updated successfully"
            })  
        } catch (error) {
            res.json({
                "msg":"Error occured while fetching dashboard"
            })
        }
        
    }
    
})
dashboardRouter.post("/subscribeEmail",authMiddleware,async(req,res)=>{
    try {
      await prisma.user.update({
        where:{
            id:parseInt(req.id)
        },
        data:{
            receiveEmail:true
        }
    })
    res.json({
        "msg":"Subscribed successfully"

    })  
    } catch (error) {
        res.status(500).json({
            "msg":"Server Error"
        })
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
        "msg":"Unsuscribed Successfully"
    }) 
     
    } catch (error) {
        res.status(500).json({
            "msg":"Server Error"
        })
    }
    
})