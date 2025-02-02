import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import {SubmitHandler, useForm } from 'react-hook-form'
import zod from 'zod'
import { URI } from '../assets/URI';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
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
    const {toast}=useToast()
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

          
    if (axios.isAxiosError(error)) {
        if (error.response) {
            // Server responded but with an error status
            toast({
                title: "Error occurred",
                description: error.response.data.msg || "Something went wrong",
                duration: 2000
            });

            if (error.response.status === 404) {
                setError("email", { message: error.response.data.msg });
            } else if (error.response.status === 403) {
                setError("password", { message: error.response.data.msg });
            } else {
                setError("root", { message: error.response.data.msg });
            }
        } else {
            // No response received (network error)
            setError("root",{message:"Error occured"})
            toast({
                title: "Network Error",
                description: "Cannot connect to the server. Please try again later.",
                duration: 2000
            });
        }
    } else {
        // Unexpected non-Axios error
        setError("root",{message:"Error occured"})
        toast({
            title: "Unexpected Error",
            description: "An unexpected error occurred. Please try again.",
            duration: 2000
        });
    }
}
        
    }
    return (
        <div className='w-screen h-screen bg-custom4th bg-center bg-cover md:bg-black md:bg-none flex items-center justify-center text-white'>
    <form onSubmit={handleSubmit(onsubmit)}  className='w-full backdrop-blur-[3px] h-full md:w-1/2 md:h-1/2 rounded-md flex flex-col gap-2 items-center justify-center'>
        <p className='text-3xl'>Signin</p>
        <input {...register("email")} type='text' placeholder='Email' className='rounded-md p-2 text-black'/>
        {errors.email && <div>{errors.email.message}</div> }
        <input {...register("password")} type='text' placeholder='Password' className='rounded-md p-2 text-black'/>
        {errors.password  && <div>{errors.password .message}</div> }
        <button type='submit'  className='bg-black className="bg-transparent text-white rounded p-2 shadow-custom2nd font-medium w-48 mt-2 hover:bg-yellow-500' disabled={isSubmitting}>{isSubmitting?"Submitting please wait...":"Submit"}</button> 
        <p className='text-sm'>New here? Try <Link to={"/signup"} className='underline-offset-1 underline'>signing up</Link></p>
    </form>
    <div className='invisible md:visible md:w-1/2 h-full bg-custom4th bg-cover bg-center'></div>
    <Toaster/>
    </div>
)
}