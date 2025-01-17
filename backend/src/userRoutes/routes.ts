import express from 'express'
import { authMiddleware } from '../auth/authMiddleware'
import { prisma } from '..'
import { activitySchema, enumArray, updateUserSchema } from '../zodSchema'


export const activityRouter=express.Router()


interface dataInterface {
    workingDays?:enumArray[],
    activity?:string
}

activityRouter.get("/activity",authMiddleware,async(req,res)=>{ /// get all 3 activity details
    try {
        const user=await prisma.user.findFirst({
            where:{
                id:parseInt(req.id)
            },
            include:{
                activity:true
            } 
        })
        if (!user) {
            res.status(403).json({
                "msg":"User don't exists"
            })
        }
        res.json({
            "msg":user?.activity
        })
    } catch (error) {
        res.json({
            "msg":"Db crashed.  Refresh again"
        })
    }          
})


activityRouter.post("/activity",authMiddleware,async (req,res)=>{   /// post new activity (max 3)
    const {activity, totalDays, workingDays}= req.body
  
    const validSchema=activitySchema.safeParse({
        activity,
        totalDays,
        workingDays
    })
    if (validSchema.success) {
        await prisma.$transaction(async (prisma)=>{
            const activityCount=await prisma.activity.count({
                where:{
                    userId:parseInt(req.id),  
                    progress: {                 // this makes sure that active activity stays <=3
                        not:100
                    }
                },
            })
            if (activityCount===3) {
                res.status(403).json({
                    "msg":"Focus on the pending 3 tasks first"
                })
                return
            } else {
                try {
                    await prisma.activity.create({
                    data:{
                        activity:activity,
                        progress: 0.00,
                        totalDays:totalDays,
                        currentDay:0,
                        workingDays:workingDays,
                        userId: parseInt(req.id)
                    }
                })
                res.json({
                    "msg":"New activity added"
                })
                } catch (error) {
                    res.status(500).json({
                        "msg":"Query crashed. Retry again"
                    })
                    return;
                }}
        })
        
    } else {
        res.status(403).json({
            "msg":"Invalid Entries. Please provide correct formats"
        })
    }
    
})

activityRouter.post("/progress/:activityId",authMiddleware,async(req,res)=>{  //// post progress in one activity
    const activityId=req.params.activityId
    const progress=parseInt(req.body.progress)
    const lastUpdatedAt=new Date(req.body.date).setHours(0,0,0,0)
    const todayDate=new Date()
    const msDate=new Date().setHours(0,0,0,0)
    const ms=24*60*60*1000
    const updateValues:{streak?:{increment:number}|1,streakDate?:Date}={streakDate:todayDate}

    if (progress<=100 && progress>0) {
        
    if (msDate-lastUpdatedAt<1) {
        
        try {
          await prisma.activity.update({
            where:{
                id:parseInt(activityId),
                userId:parseInt(req.id)
            },
            data: {
                progress:progress,
                currentDay:{increment:1}
            }
        })
        res.json({
            "msg":"Progressed! Keep it up"
        })
         
        } catch (error) {
            res.status(500).json({
                "msg":"Server Error"
            })
        }
        
    } else {
        if ((msDate-lastUpdatedAt)/ms===1) {
            updateValues.streak={
                increment:1
            }
        }
        else {
                updateValues.streak=1
        }
        try {
                await prisma.dashboard.update({
                    where:{
                        userId:parseInt(req.id)
                    },
                    data:updateValues
                    })
                await prisma.activity.update({
                    where:{
                        id:parseInt(activityId),
                        userId:parseInt(req.id)
                    },
                    data: {
                        progress:progress,
                        currentDay:{increment:1}
                    }
                })
                res.json({
                    "msg":"Progressed! Keep it up"
                })   
        } catch (error) {
                res.status(500).json({
                    "msg":"Server error"
                })
            }
        }

    } else {
        res.status(403).json({
            "msg":"Invalid progress"
        })
    }
    
})


activityRouter.post("/completed/:activityId",authMiddleware,async(req,res)=>{    /// post completed in one activity
    const activityId=req.params.activityId
    try {
        await prisma.activity.delete({
            where:{
                id:parseInt(activityId),
                userId:parseInt(req.id)
            }
        })
        await prisma.dashboard.update({
            where:{
                userId:parseInt(req.id)
            },
            data:{
                completedActivities:{
                    increment:1
                }
            }
        })
        res.json({
            "msg":"Congratulations, activity completed"
        }) 
    } catch (error) {
        res.status(500).json({
            "msg":"Error occured. Try again"
        })
    }
    
})
activityRouter.post("/update/:activityId",authMiddleware,async(req,res)=>{
    const activityId=req.params.activityId
    const {workingDays, activity}=req.body
    const parsed=updateUserSchema.safeParse({workingDays, activity})
    if (!parsed.success) {
            res.status(411).json({
                "msg":"Invalid Entries. Please provide correct formats"
            }) 
            return;}
    const dataToUpdate:dataInterface={};

    if (workingDays!==undefined) {
            dataToUpdate.workingDays=workingDays
        }
    if (activity!==undefined) {
            dataToUpdate.activity=activity
        }
       
    try {                                       //    Object.keys(dataToUpdate).length==0 or activity id can be wrong
        await prisma.activity.update({
            where:{
                id:parseInt(activityId),
                userId: parseInt(req.id)
            },
            data:dataToUpdate
        })
        res.json({
            "msg":"Progressed! Keep it up."
        })
    } catch {
        res.json({
            "msg":"Nothing to update/ Wrong activityId"
        })
        
    }
        
    
    
})

activityRouter.delete("/delete/:activityId",authMiddleware,async(req,res)=>{    /// delete one activity
    const activityId=req.params.activityId
    const ans=await prisma.activity.delete({
        where:{
            id:parseInt(activityId),
            userId:parseInt(req.id)
        }
    })
 
    res.json({
        "msg":"Activity deleted successfully"
    })
})
