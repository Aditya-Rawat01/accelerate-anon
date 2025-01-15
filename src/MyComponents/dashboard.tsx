import { usGetDashboard } from "@/datafetchinghooks/useGetdashboard";
import { Logout } from "./logout";
import { AxiosError } from "axios";
type userDash= {
    completedActivities: number;
    streak: number;
    user: {
        id: number;
        email: string;
        username: string;
        password: string;
        receiveEmail: boolean;
    };
} | null
export function Dashboard() {
    const {data, error, isFetching, isError}=usGetDashboard()
    const obj:userDash=data
    if (isFetching) {
        return <>Skeleton/loader</>
    }
    if (isError) {
        return <>{error.message}</>
    }
    return (
        <div className="w-full h-1/4 bg-black text-white flex items-center justify-around">
            
           <div>Hi, <span  className="text-2xl"> {obj?.user.username} </span></div>
           <div className="flex items-center gap-2"> Completed Activities:<span className="text-2xl">{obj?.completedActivities} </span> </div>
           <div className="flex items-center gap-2"> Streak: <span  className="text-2xl"> {obj?.streak} </span> </div>
            
            <Logout/>
        </div>
    )
}