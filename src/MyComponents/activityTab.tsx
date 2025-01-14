import { useFetchActivity } from "../datafetchinghooks/useFetchActivity"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { AlertBox} from "./alertBox";
import { Button } from "@/components/ui/button";
import { AddActivity } from "./addActivity";
  
interface activityArr {
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
                    <Drawer>
                        <DrawerTrigger className="text-[9px] sm:text-sm text-gray-500">Click to open entire activity</DrawerTrigger>
                        <DrawerContent className="h-4/5"> 
                            <div className="w-full flex justify-between items-center text-xs font-light text-gray-600 p-2">
                                <div>
                                    <p>Created At: {index.createdAt.toString().substring(0,10)}</p>
                                    <p>Updated At: {index.lastUpdatedAt.toString().substring(0,10)}</p>
                                </div>
                                <DrawerClose className="w-fit" asChild>
                                    <Button className="w-[34px] h-[34px] rounded-full border border-gray-700 text-sm flex items-center justify-center">X</Button>
                                </DrawerClose>
                            </div>
                            <DrawerHeader>
                            <DrawerDescription className="flex items-center justify-center">Activity</DrawerDescription>
                                <DrawerTitle className="flex items-center justify-center text-3xl">{index.activity}</DrawerTitle>
                                <div className="w-full h-20 flex items-center justify-center"><DrawerTitle className="w-full sm:w-1/2 md:w-1/4 flex items-center justify-around">{index.workingDays.map((index)=><div key={index} className="rounded-full w-[40px] border border-1 border-gray-400 text-xs font-normal flex items-center justify-center">{index}</div>)}</DrawerTitle></div>
                                <DrawerTitle className="font-normal flex justify-center"> Day: {index.currentDay}/ {index.totalDays}</DrawerTitle>
                                <DrawerTitle className="font-normal h-28 md:mt-5 text-2xl flex items-center justify-center">Progress: {index.progress} %</DrawerTitle>
                                
                            </DrawerHeader>
                            <DrawerFooter>
                            <div className="flex gap-2 items-center justify-center">
                                <Button className="w-44 p-1 h-12 border border-1 border-gray-700 rounded-full text-sm hover:bg-green-500 hover:border-none hover:text-white active:opacity-50">Mark today's progress</Button>
                                {<AlertBox value={"Mark as completed"} activityId={index.id}/>}
                            </div>
                            
                            </DrawerFooter>
                        </DrawerContent>
                        </Drawer>

                    
                    
                    </p>
                    <p className="pr-2 text-xs sm:text-sm">Last Updated At: {index.lastUpdatedAt.toString().substring(0,10)}</p>
                </div>
            </div>
        })}
        <div className="w-[99%] h-28 bg-red-300 text-white rounded-xl flex justify-center items-center">
            {<AddActivity value={"+ Add more activity"}/>}
        </div>
    </div>)
}