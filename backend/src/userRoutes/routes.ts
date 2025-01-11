import express from 'express'
import { authMiddleware } from '../auth/authMiddleware'


export const routesRouter=express.Router()


routesRouter.get("/",authMiddleware,(req,res)=>{    /// get all 3 activity
    res.json({
        "msg":"hi"
    })
})


routesRouter.post("/activity",authMiddleware,(req,res)=>{   /// post new activity (max 3)
    res.json({
        "msg":"done"
    })
})
routesRouter.post("/progress/:activityId",authMiddleware,(req,res)=>{    /// post progress in one activity
    
    //logic for searching activityId and checking if the req.id  is actually it's owner
    res.json({
        "msg":"hi"
    })
})