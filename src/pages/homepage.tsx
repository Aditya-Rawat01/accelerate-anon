import { Link } from "react-router-dom";
import { Signup } from "./signup";
import accelerate from '../assets/accelerate.jpg'
import pexels from '../assets/pexels.jpg'
export function Homepage() {
    return (
    <div className='h-screen'>
      <div className="absolute z-20 topbar w-full h-24 text-white flex items-center justify-between p-2 sm:p-5">
        <div className="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
            <p className="text-lg sm:text-xl font-extralight">Accelerate Anon</p>
            
        </div>
        <div className="w-fit flex sm:gap-5 items-center  text-xs sm:text-base">
          <Link to={"/signup"} className="hover:bg-white hover:text-black p-2 rounded-sm">Signup</Link>
          <Link to={"/signin"} className="hover:bg-white hover:text-black p-2 rounded-sm">Signin</Link>
        </div>
      </div>




        <div className="absolute top-0 bg-custom w-screen h-screen bg-cover bg-left bg-no-repeat flex flex-col text-white justify-center">
        <div className="text-sm w-3/5 flex flex-col gap-2 pl-2 text-[13px] font-extralight leading-4">
          <p className="text-[24px] font-extralight leading-8">Need reminder for your goals?</p>
          <p>Staying on track can be tough, but with the right tools, it's <strong>possible.</strong></p>
          <p>Meet <strong>Accelerate Anon</strong> – your personal guide to success.</p> 
          <p>Whether it's fitness, learning, or achieving your dreams, we've got your back.</p>
          <p>Set your goals, stay motivated, and see real progress. Take the first step today!</p>
          <button className="bg-transparent text-white rounded p-2 shadow-custom font-medium w-48 mt-2 hover:bg-yellow-500">Try Accelerate Anon</button>
        </div> 
        </div>
        

        <div className="w-full bg-white h-24"></div>
        hero page with accelerate anon

        2nd page shows every detail

        last page will be contact
        <Signup/>
      </div>)
}