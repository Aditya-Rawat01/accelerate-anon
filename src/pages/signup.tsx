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
        <div className='w-screen h-screen bg-custom3rd bg-center bg-cover md:bg-black md:bg-none flex items-center justify-center text-white'>
            <form  onSubmit={handleSubmit(onsubmit)}  className='w-full  backdrop-blur-[3px] h-full md:w-1/2 md:h-1/2 rounded-md flex flex-col gap-2 items-center justify-center'>
                <p className='text-3xl'>Signup</p>
                <input {...register("username")} type='text' placeholder='Username' className='rounded-md p-2 text-black'/>
                {errors.username && <div>{errors.username.message}</div> }
                <input {...register("email")} type='text' placeholder=' Email' className='rounded-md p-2 text-black'/>
                {errors.email && <div>{errors.email.message}</div> }
                <input {...register("password")} type='text' placeholder=' Password' className='rounded-md p-2 text-black'/>
                {errors.password  && <div>{errors.password .message}</div> }
                <button type='submit'  className='bg-black className="bg-transparent text-white rounded p-2 shadow-custom font-medium w-48 mt-2 hover:bg-yellow-500' disabled={isSubmitting}>{isSubmitting?"Submitting please wait...":"Submit"}</button> 
                <p className='text-sm'>Already Signed up? Try <Link to={"/signin"} className='underline-offset-1 underline '>signing in</Link></p>
            </form>
            <div className='invisible md:visible md:w-1/2 h-full bg-custom3rd bg-cover bg-center'></div>
        </div>
)
}