import { Link } from "react-router-dom";
import astronaut from "../assets/astronaut.png"
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




        <div className="bg-custom w-screen h-screen bg-cover md:bg-custom2nd md:bg-contain md:bg-right md:bg-slate-950 bg-left bg-no-repeat flex flex-col text-white justify-center">
        <div className="text-sm w-3/5 flex flex-col gap-2 pl-2 sm:pl-4 lg:items-center text-[13px] font-extralight leading-4">
          <p className="text-[24px] font-extralight leading-8">Need reminder for your goals?</p>
          <p>Staying on track can be tough, but with the right tools, it's <strong>possible.</strong></p>
          <p>Meet <strong>Accelerate Anon</strong> – your personal habit tracker</p> 
          <p>Whether it's fitness, learning, or achieving your dreams, we've got your back.</p>
          <p>Set your goals, stay motivated, and see real progress. Take the first step today!</p>
          <Link to={"/signup"} ><button className="bg-transparent text-white rounded p-2 shadow-custom font-medium w-48 mt-2 hover:bg-yellow-500">Try Accelerate Anon</button></Link>
        </div> 
        </div>
        

        <div className="w-full bg-black text-white h-screen flex flex-col  gap-5 p-5 items-center justify-center font-light relative overflow-hidden">
          <div><img src={astronaut}  className="absolute top-0 sm:top-10 w-96 h-32 left-[35%] sm:left-1/2 rounded-full"></img></div>
          <p className="text-3xl">Feeling overwhelmed?</p>
          <div className="flex flex-col gap-5 lg:w-2/3">
              <p>We all have those moments where life feels like a juggling act—too many tasks, too little time. It’s okay to pause, breathe, and take it one step at a time.</p>
              <p>"We overestimate what we can do in a day but underestimate what we can achieve in a year."</p>
              <p>Our platform is here to help you stay on track, motivated, and moving forward—one step at a time.</p>
          </div>
        </div>



        <div className="w-full bg-slate-950 text-white h-screen flex flex-col p-3 gap-5 items-center justify-center font-light">
          <p className="text-3xl">What does platform do?</p>
          <div className="w-4/5 flex flex-col justify-around h-4/5 items-center sm:text-xl">
                <div className="flex gap-6 w-64">
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                  </div>
                  <div>
                    <p>Create activities</p>

                    <p className="text-xs">Make new tasks to complete</p>
                  </div>
                </div>
                <div className="flex gap-6 w-64">
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-clipboard-data size-5" viewBox="0 0 16 16">
                  <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z"/>
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
</svg>
                  </div>
                  <div>
                    <p>Track Your Progress</p>

                    <p className="text-xs">See how close you are to your goals</p>
                  </div>
                </div>
                <div className="flex gap-6 w-64">
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-trophy size-5 mt-1" viewBox="0 0 16 16">
                  <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935M3.504 1q.01.775.056 1.469c.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.5.5 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667q.045-.694.056-1.469z"/>
                  </svg>

                  </div>
                  <div>
                    <p>Maintain the streaks</p>

                    <p className="text-xs">{`Show up daily! Don’t miss a day :)`}</p>
                  </div>
                </div>
                <div className="flex gap-6 w-64">
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-fire size-9 pb-4" viewBox="0 0 16 16">
                  <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"/>
                  </svg>

                  </div>
                  <div>
                    <p>Motivation Mails</p>
                    <p className="text-xs">Get customized weekly motivational doses in form of mails</p>
                  </div>
                </div>
          </div>
        </div>
       <div className="h-2/3 bg-black text-white w-full relative flex items-center justify-center  gap-5 flex-col">
        <p className="text-2xl">So what's you waiting for?</p>
        <Link to={"/signup"} ><button className="bg-transparent text-white rounded p-2 shadow-custom font-medium w-48 mt-2 hover:bg-yellow-500">Try Accelerate Anon</button></Link>
       <div className="absolute bottom-0 flex justify-around items-center w-full bg-black">
        <p className="text-xs font-light text-gray-500">Accelerate anon @ infinity</p>
        <p className="text-xs font-light text-gray-500">Made by Aditya</p>
        </div>
       </div>
        
      </div>)
}