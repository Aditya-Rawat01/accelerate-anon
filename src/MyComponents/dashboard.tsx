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
        <div className="w-full h-1/4 text-white flex items-end justify-around bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
                {isFetching && <div className="flex gap-2 items-center">
                    <div className="w-5 h-5 border-[3px] border-t-green-500 border-l-green-500  rounded-full animate-spin"></div>
                Loading...
    </div>}
                {isError && <div>{error.message}</div>}
            </div>
            <div className="flex flex-col sm:flex-row w-full p-3 sm:items-center justify-around flex-wrap h-2/3 bg-black">
                <div>Hi, <span  className="sm:text-2xl"> {obj?.user.username} </span></div>
                <div className="flex items-center gap-2"> Completed Activities:<span className="sm:text-2xl">{obj?.completedActivities} </span> </div>
                <div className="flex items-center gap-2"> Streak: <span  className="sm:text-2xl"> {obj?.streak} </span> </div>
            </div>
            <Logout/>
        </div>
    )
}