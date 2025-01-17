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
        "msg":"Unsubscribed Successfully"
    }) 
     
    } catch (error) {
        res.status(500).json({
            "msg":"Server Error"
        })
    }
    
})

    
// const dash=await axios.post(`${URI}/dash/update`,{
//     streakDate:res.data.msg.streakDate 
// },{headers:{
//     Authorization:localStorage.getItem("token") 
// }})
  

// const lastUpdatedAt=new Date(req.body.date).setHours(0,0,0,0)
//     const todayDate=new Date()
//     const msDate=todayDate.setHours(0,0,0,0)
//     const ms=24*60*60*1000
//     const updateValues:{streak?:{increment:number}|1,streakDate?:Date}={}
//     if (lastUpdatedAt-msDate<1) {
//         try {
//           await prisma.activity.update({
//             where:{
//                 id:parseInt(activityId),
//                 userId:parseInt(req.id)
//             },
//             data: {
//                 progress:progress,
//                 currentDay:{increment:1}
//             }
//         })  
//         } catch (error) {
//             res.status(500).json({
//                 "msg":"Server Error"
//             })
//         }
        
//     } else {
//         if ((lastUpdatedAt-msDate)/ms===1) {
//             console.log("reached here")
//             updateValues.streak={
//                 increment:1
//             }
//             updateValues.streakDate=todayDate
//         }
//             else {
//                 updateValues.streak=1
//             }
//     }