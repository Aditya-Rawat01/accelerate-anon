import express from 'express'
import { signupRouter } from './signup'
import { signinRouter } from './signin'

export const authRouter=express.Router()


authRouter.use("/signup",signupRouter)
authRouter.use("/signin",signinRouter)