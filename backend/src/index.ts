import express from 'express'
import cors from 'cors'
import { authRouter } from './auth/auth'
import { configDotenv } from 'dotenv'
import { activityRouter } from './userRoutes/routes'
import {  PrismaClient } from '@prisma/client'
import { dashboardRouter } from './dashboardRoutes/dashRoute'
import { emailScheduler } from './automatedEmails/emailScheduler'
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const app=express()
//----------------------------- Uncomment the cron job function-------
export const prisma=new PrismaClient()
declare global {
    namespace Express {
      interface Request {
        token:string,
        id:string,
        receiveEmail:boolean
      }
    }
  }
// might add these ---
// const corsOptions = {
//     origin: ['http://trusted-origin.com', 'http://another-trusted.com', null], // Add specific origins and null for Postman
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Limit allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Limit allowed headers
//   };
app.use(cors())
app.use(express.json())


app.use("/auth",authRouter)
app.use("/user",activityRouter)
app.use("/dash",dashboardRouter)

emailScheduler() // cron job + nodemailer logic

app.listen(process.env.PORT||3000)
// signup (done)
//sign in  (done)
//get all info (done)
//post new info (done)
//update info (done)
//delete new info (done)