import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
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
import { useCompleteActivity } from "@/datafetchinghooks/completeActivity"
import { useRef, useState } from "react"
import { activityArr } from "./activityTab"
import { useUpdateActivity } from "@/datafetchinghooks/updateActivity"
import { useToast } from "@/hooks/use-toast"
import { useRecoilValue } from "recoil"
import { streakDateAtom } from "@/streakDate"
import { EditActivity } from "./editActivity"

export function ActivityCompletion({index}:{index:activityArr}) {
  const {toast}=useToast()
  const [open,setOpen]=useState(false)
  const streakDate=useRecoilValue(streakDateAtom)
    const {mutate, isPending}=useCompleteActivity()
    const {mutate:mutateActivity}=useUpdateActivity()
    const isValidProgress=useRef(true)
    function CompletedActivity() {
        setOpen(false)
        mutate({activityId:index.id},{
          onSuccess:(data)=>{
            toast({
              title: data,
              duration:2000
            })
          },
          onError:(error:any)=>{
            toast({
              title: error.response.data.msg,
              duration:2000
            })
          }
        })
    }

    function updateActivity() {
      setOpen(false)
      const progress=((index.currentDay+1)/(index.totalDays))*100
      if (progress<=100) {
        if (progress===100) {
          isValidProgress.current=false
        }
        mutateActivity({activityId:index.id, progress, streakDate},{
          onSuccess:(data)=>{
            toast({
              title: data,
              duration:2000
            })
          },
          onError:(error:any)=>{
            toast({
              title: error.response.data.msg,
              duration:2000
            })
          }
        })
      }
      
    }
    return (<>
                        <Drawer open={open} onOpenChange={setOpen}>
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
                                <DrawerTitle className="flex items-center justify-center text-3xl relative">
                                  <p>{index.activity}</p>
                                  <EditActivity activityId={index.id} days={index.totalDays} activity={index.activity} currentDay={index.currentDay} workingDays={index.workingDays}/>  
                                </DrawerTitle>
                                
                                <div className="w-full h-20 flex items-center justify-center"><DrawerTitle className="sm:w-fit gap-1 sm:gap-2 flex items-center justify-around">{index.workingDays.map((index)=><div key={index} className="rounded-full w-[38px] sm:w-[40px] border border-1 border-gray-400 text-xs font-normal flex items-center justify-center">{index}</div>)}</DrawerTitle></div>
                                <DrawerTitle className="font-normal flex justify-center"> Day: {index.currentDay}/ {index.totalDays}</DrawerTitle>
                                <DrawerTitle className="font-normal h-28 md:mt-5 text-2xl flex items-center justify-center">Progress: {index.progress} %</DrawerTitle>
                                
                            </DrawerHeader>
                            <DrawerFooter>
                            <div className="flex gap-2 items-center justify-center">
                                <Button className="w-44 p-1 h-12 border border-1 border-gray-700 rounded-full text-sm hover:bg-green-500 hover:border-none hover:text-white active:opacity-50" onClick={updateActivity} disabled={!isValidProgress.current}>Mark today's progress</Button>
                                
                                
                               
                                <AlertDialog>
                                    <AlertDialogTrigger className="w-44 h-12 border border-1 border-gray-700 rounded-full text-sm hover:bg-green-500 hover:border-none hover:text-white active:opacity-50 overflow-hidden">Mark as completed</AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. This will mark this activity as completed. From now on you will not receive emails for this activity
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={CompletedActivity} disabled={isPending}>{isPending?"Completing the activity...":"Continue"}</AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                            
                            </div>
                            
                            </DrawerFooter>
                        </DrawerContent>
                        </Drawer>
                        
      </>
      )
}