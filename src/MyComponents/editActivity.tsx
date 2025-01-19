import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRenameActivity } from "@/datafetchinghooks/renameActivity"
import { useRef } from "react"
import { WeekSelector } from "./WeekSelector"
import { toast, useToast } from "@/hooks/use-toast"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useDeleteActivity } from "@/datafetchinghooks/useDeleteActivity"

type props={
    days:number,
    activity:string,
    currentDay:number,
    activityId:number,
    workingDays:string[]
}

export function EditActivity({days,activity, currentDay, workingDays, activityId}:props) {
    const activityRef=useRef<HTMLInputElement>(null)
    const DaysRef=useRef<HTMLInputElement>(null)
    const workingDaysRef=useRef<string[]>([])
    const {toast}=useToast()
    const {mutate, isPending}=useRenameActivity()
    function HandleSubmit() {
        if (workingDaysRef.current.length===0) {
            workingDaysRef.current=workingDays
        }
        if (DaysRef.current && activityRef.current) {
            mutate({activity:activityRef.current.value, totalDays:parseInt(DaysRef.current.value), workingDays:workingDaysRef.current, currentDay:currentDay, activityId:activityId},
          { 
            onSuccess:(data)=>{
              toast({
                title: data,
                duration:2000
              })
            },
            onError:(error:any)=>{
              toast({
                title: error.response.data.msg,
                duration:2000,
                
              })
            }
          })
        }
        workingDaysRef.current=[]
    }
    if (isPending) {
      return <div className="w-full h-[80vh] absolute top-0 left-1/2 -translate-x-1/2 rounded-xl bg-white flex pt-6 justify-center">Updating Activity... Please wait</div>
    }

    return <div className="absolute right-[20%] sm:right-[30%] md:right-[35%] text-sm  font-light hover:cursor-pointer">
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="outline outline-1 outline-gray-400">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Details</DialogTitle>
          <DialogDescription>
            Make changes to your activity. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e)=>{
            e.preventDefault()
            
            HandleSubmit()}}>
        <div className="grid gap-4 py-4">
        
        <div className="grid grid-cols-4 items-center gap-4">
           
            <Label htmlFor="Activity" className="text-right">
              Activity
            </Label>
            <Input id="Activity" defaultValue={activity} ref={activityRef} className="col-span-3" required={true}/>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="days" className="text-right">
              Total Days
            </Label>
            <Input type="number" id="days" defaultValue={days} ref={DaysRef} className="col-span-3" required={true}/>
          </div>
          
          <div className="grid-cols-4 flex items-center gap-4">
            <Label htmlFor="workingDays" className="text-right">
              Working Days
            </Label>
            <WeekSelector workingDays={workingDaysRef}/>
            </div>
        
        </div>
        
        <DialogFooter>
          <AlertDialogopen activityId={activityId}/>
          <Button type="submit">Save changes</Button>
          
        </DialogFooter>
        
        </form>
       
      </DialogContent>
    </Dialog>
  </div>
}


function AlertDialogopen({activityId}:{activityId:number}) {
  const {mutate, isPending}=useDeleteActivity()
  function DeleteActivity() {
    mutate({activityId},{
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
  return (<AlertDialog>
    <AlertDialogTrigger className="bg-red-600 px-2 p-1 text-white rounded-md hover:bg-red-500 mt-2 sm:mt-0">Delete Activity</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will erase the activity permanently.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className="bg-red-600 hover:bg-red-500 mt-2 sm:mt-0" onClick={DeleteActivity} disabled={isPending}>{isPending?"Deleting the activity...":"Continue"}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>)
}