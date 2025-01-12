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
    
    const userDash=await prisma.dashboard.findFirst({
    where:{
        userId:parseInt(req.id)
    }
 })
    res.json({
        "msg":userDash
    })
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