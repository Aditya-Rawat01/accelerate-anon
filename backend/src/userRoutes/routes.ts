import express from 'express'
import { authMiddleware } from '../auth/authMiddleware'


export const activityRouter=express.Router()


activityRouter.get("/",authMiddleware,(req,res)=>{    /// get all 3 activity details
    res.json({
        "msg":"hi"
    })
})


activityRouter.post("/activity",authMiddleware,(req,res)=>{   /// post new activity (max 3)
    res.json({
        "msg":"done"
    })
})
activityRouter.post("/completed/:activityId",authMiddleware,(req,res)=>{    /// post completed in one activity
    
    //logic for searching activityId and checking if the req.id  is actually it's owner
    res.json({
        "msg":"hi"
    })
})

activityRouter.post("/progress/:activityId",authMiddleware,(req,res)=>{  //// post progress in one activity

})