import { useFetchActivity } from "../datafetchinghooks/useFetchActivity"

import { ActivityCompletion } from "./activityCompletion";
import { AddActivity } from "./addActivity";
  
export interface activityArr {
    id: number; //no need
    activity: string; //done
    userId: number; // no need
    progress: number;
    totalDays: number;
    currentDay: number;
    workingDays: string[]; //done
    createdAt: number; //done
    lastUpdatedAt: number; //done
}
export function ActivityTab() {
    const {data, isFetching, isLoading, error, isError}=useFetchActivity()

    if (isLoading) {
        return <>Fetching Data</>
    }
    if (isError) {
        return <>{error?.message}</>
    }
     return (
    <div className="w-full h-4/5 flex flex-col gap-2 items-center">
        {isFetching && <div>Re-configuring details</div>}
        {data?.map((index:activityArr)=>{
            return <div key={index.id} className="w-[99%] relative h-28 border border-dotted border-gray-700 rounded-2xl grid grid-cols-12 grid-rows-12 ">
                <div className="row-start-6 text-xl place-self-center col-span-12">Activity:{index.activity}</div>
                <div className="absolute right-2 top-1">
                    <p className="text-xs md:text-sm">Current Day:{index.currentDay.toString()}</p>
                    <p className="text-xs md:text-sm">Total Day:{index.totalDays.toString()}</p>
                </div>
                <div className="row-start-11 col-span-12 relative place-items-end h-fit">
                    
                    <p className="text-xs sm:text-sm absolute bottom-5 sm:bottom-1 left-1/2 -translate-x-1/2">
                    {<ActivityCompletion index={index}/>}
   
                    
                    </p>
                    <p className="pr-2 text-xs sm:text-sm">Last Updated At: {index.lastUpdatedAt.toString().substring(0,10)}</p>
                </div>
            </div>
        })}
        <div className="w-[99%] h-28 bg-green-500 text-white rounded-xl flex justify-center items-center">
            {<AddActivity value={"+ Add more activity"}/>}
        </div>
    </div>)
}