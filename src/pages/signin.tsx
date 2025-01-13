import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import {SubmitHandler, useForm } from 'react-hook-form'
import zod from 'zod'
import { URI } from '../assets/URI';
import { Link, useNavigate } from 'react-router-dom';
const userSignin=zod.object({
    email: zod.string().email("Provide valid Email").transform((val)=>val.toLowerCase()),
    password: zod.string().min(5, "Provide 5 or more characters")

})

interface ErrorWorkableSchema {
    response:{
        data:{
            msg:string
        }
    },
    status:number
}
type formFields=zod.infer<typeof userSignin>
export function Signin() {
    const router=useNavigate()
    const {register, handleSubmit, formState:{errors, isSubmitting}, setError}=useForm<formFields>({
        resolver:zodResolver(userSignin)
    });
    const onsubmit:SubmitHandler<formFields>=async(data)=>{
        try {
            const res=await axios.post(`${URI}/auth/signin`,{
                email:data.email,
                password:data.password
            })
            localStorage.setItem("token",res.data.token)
            router("/dashboard")
            
        } catch (error:ErrorWorkableSchema|unknown) {
            const ErrorVal=(error as ErrorWorkableSchema) // bad practice
            if (ErrorVal.status===404) {
                setError("email",{
                message:ErrorVal.response.data.msg
            })}
            else if (ErrorVal.status===403) {
                setError("password",{
                    message:ErrorVal.response.data.msg
                })
            }
            else {
                setError("root",{
                    message:ErrorVal.response.data.msg
                })
            }
            
        }
        
    }
    return (
    <form onSubmit={handleSubmit(onsubmit)}  className='w-1/2 h-1/2 rounded-md bg-red-400 flex flex-col items-center justify-center'>

        <input {...register("email")} type='text' placeholder='Email'/>
        {errors.email && <div>{errors.email.message}</div> }
        <input {...register("password")} type='text' placeholder='Password'/>
        {errors.password  && <div>{errors.password .message}</div> }
        <button type='submit'  className='bg-black text-white p-3 rounded-lg' disabled={isSubmitting}>{isSubmitting?"Submitting please wait...":"Submit"}</button> 
        <p className='text-sm'>New here? Try <Link to={"/signup"} className='underline-offset-1 underline'>signing up</Link></p>
    </form>
    
)
}