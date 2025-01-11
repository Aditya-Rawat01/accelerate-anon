import express from 'express'
import cors from 'cors'
import { authRouter } from './auth/auth'
import { configDotenv } from 'dotenv'
import { activityRouter } from './userRoutes/routes'
import {  PrismaClient } from '@prisma/client'
configDotenv()
const app=express()

export const prisma=new PrismaClient()
declare global {
    namespace Express {
      interface Request {
        token:string
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
app.listen(3000)
// signup
//sign in
//get all info
//post new info
//update info
//delete new info