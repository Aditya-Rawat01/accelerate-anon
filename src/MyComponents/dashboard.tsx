import { useGetDashboard } from "@/datafetchinghooks/useGetdashboard";
import { Logout } from "./logout";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { streakDateAtom } from "@/streakDate";

type userDash= {
    completedActivities: number;
    streak: number;
    streakDate:Date,
    user: {
        id: number;
        email: string;
        username: string;
        password: string;
        receiveEmail: boolean;
    };
} | null
export function Dashboard() {
    const {data, error, isFetching, isError}=useGetDashboard()
    const obj:userDash=data
    const setState=useSetRecoilState(streakDateAtom)
    useEffect(()=>{
        if (data) {
            setState(obj!.streakDate)
        }
    },[data])
    return (
        <div className="w-full h-1/4 bg-black text-white flex items-center justify-around flex-wrap">
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
                {isFetching && <div>Loader</div>}
                {isError && <div>{error.message}</div>}
            </div>
           <div>Hi, <span  className="text-2xl"> {obj?.user.username} </span></div>
           <div className="flex items-center gap-2"> Completed Activities:<span className="text-2xl">{obj?.completedActivities} </span> </div>
           <div className="flex items-center gap-2"> Streak: <span  className="text-2xl"> {obj?.streak} </span> </div>
            
            <Logout/>
        </div>
    )
}