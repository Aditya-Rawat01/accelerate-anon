import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import {SubmitHandler, useForm } from 'react-hook-form'
import zod from 'zod'
import { URI } from '../assets/URI';
import { Link, useNavigate } from 'react-router-dom';
const userSignup=zod.object({
    username: zod.string().min(3,"Username must be greater than or equal to 3 characters"),
    email: zod.string().email("Provide valid Email").transform((val)=>val.toLowerCase()),
    password: zod.string().min(5, "Provide 5 or more characters")

})

export interface ErrorWorkableSchema {
    response:{
        data:{
            msg:string
        }
    },
    status:number
}
type formFields=zod.infer<typeof userSignup>
export function Signup() {
    const router=useNavigate()
    const {register, handleSubmit, formState:{errors, isSubmitting}, setError}=useForm<formFields>({
        resolver:zodResolver(userSignup)
    });
    const onsubmit:SubmitHandler<formFields>=async(data)=>{
        try {
            const res=await axios.post(`${URI}/auth/signup`,{
                username:data.username,
                email:data.email,
                password:data.password
            })
            localStorage.setItem("token",res.data.token)
            router("/dashboard")
           
        } catch (error:ErrorWorkableSchema|unknown) {
          
            const ErrorVal=(error as ErrorWorkableSchema) // bad practice
            if (ErrorVal.status===409) {
                setError("email",{
                message:ErrorVal.response.data.msg
            })}
            else {
                setError("root",{
                    message:ErrorVal.response.data.msg
                })
            }
            
        }
        
    }
    return (
    <form onSubmit={handleSubmit(onsubmit)}  className='w-1/2 h-1/2 rounded-md bg-red-400 flex flex-col items-center justify-center'>
        
        <input {...register("username")} type='text' placeholder='Username'/>
        {errors.username && <div>{errors.username.message}</div> }
        <input {...register("email")} type='text' placeholder='Email'/>
        {errors.email && <div>{errors.email.message}</div> }
        <input {...register("password")} type='text' placeholder='Password'/>
        {errors.password  && <div>{errors.password .message}</div> }
        <button type='submit'  className='bg-black text-white p-3 rounded-lg' disabled={isSubmitting}>{isSubmitting?"Submitting please wait...":"Submit"}</button> 
        <p className='text-sm'>Already Signed up? Try <Link to={"/signin"} className='underline-offset-1 underline'>signing in</Link></p>
    </form>
    
)
}