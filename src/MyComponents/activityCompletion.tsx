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
import { useState } from "react"
import { activityArr } from "./activityTab"

export function ActivityCompletion({index}:{index:activityArr}) {
  const [open,setOpen]=useState(false)
    const {mutate, isPending}=useCompleteActivity()
    function Activityupdation() {
        setOpen(false)
        mutate({activityId:index.id},{
        
        })
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
                                <DrawerTitle className="flex items-center justify-center text-3xl">{index.activity}</DrawerTitle>
                                <div className="w-full h-20 flex items-center justify-center"><DrawerTitle className="w-full sm:w-1/2 md:w-1/4 flex items-center justify-around">{index.workingDays.map((index)=><div key={index} className="rounded-full w-[40px] border border-1 border-gray-400 text-xs font-normal flex items-center justify-center">{index}</div>)}</DrawerTitle></div>
                                <DrawerTitle className="font-normal flex justify-center"> Day: {index.currentDay}/ {index.totalDays}</DrawerTitle>
                                <DrawerTitle className="font-normal h-28 md:mt-5 text-2xl flex items-center justify-center">Progress: {index.progress} %</DrawerTitle>
                                
                            </DrawerHeader>
                            <DrawerFooter>
                            <div className="flex gap-2 items-center justify-center">
                                <Button className="w-44 p-1 h-12 border border-1 border-gray-700 rounded-full text-sm hover:bg-green-500 hover:border-none hover:text-white active:opacity-50">Mark today's progress</Button>
                                
                                
                               
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
                                        <AlertDialogAction onClick={Activityupdation} disabled={isPending}>{isPending?"Completing the activity...":"Continue"}</AlertDialogAction>
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