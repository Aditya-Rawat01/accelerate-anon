import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { WeekSelector } from "./WeekSelector"
import { SubmitHandler, useForm } from "react-hook-form"
import zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorWorkableSchema } from "@/pages/signup"
import { useRef, useState } from "react"
import { usePostActivity } from "@/datafetchinghooks/postActivity"
const zodSchema=zod.object({
  activity:zod.string().min(1,"Activity name must be provided"),
  TotalDays:zod.number()
})

import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

type formFields=zod.infer<typeof zodSchema>
export function AddActivity({value}:{value:string}) {
  const { toast } = useToast()
  const workingDayRef=useRef<string[]>([])
  const [open,setOpen]=useState(false)
  const {register, handleSubmit, formState:{errors, isSubmitting},setError, reset}=useForm<formFields>({
    resolver:zodResolver(zodSchema),
    defaultValues:{
      activity:"",
      TotalDays:1
    }
  })
  const {mutate, isPending}=usePostActivity()
  const onsubmit:SubmitHandler<formFields>=async(data)=>{
    try {
          if (workingDayRef.current.length===0) {
            setError("root",{
              "message":"Select at least one day for activity"
            })
            return
          }
          setOpen(false)
          mutate({data:data, ref:workingDayRef.current},{
            onSuccess:(data)=>{
              toast({
                title: data,
                duration:2000
              })
            
              reset({
                activity:'',
                TotalDays:1
              })
            },
            onError:(error:any)=>{
              toast({
                title: error.response.data.msg,
                duration:2000
              })
            
        }
          })
  } catch (error:ErrorWorkableSchema|unknown) {
      const ErrorVal=(error as ErrorWorkableSchema) // bad practice
          setError("root",{
              message:ErrorVal.response.data.msg
          })
  }
  }
    if (isPending) {
      return <div className="text-xl">Saving Changes...</div>
    }
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger className="text-xl">{value}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Activity</DialogTitle>
      <DialogDescription>
      </DialogDescription>
    </DialogHeader>
    <form onSubmit={handleSubmit(onsubmit)}>
    <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Activity:
            </label>
            <input id="name" {...register("activity")} className="col-span-3 p-2 border border-1 border-black rounded-md" />
            {errors.activity && <div className="col-span-4 flex justify-center">{errors.activity.message}</div>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="days" className="text-right">
              Total Days:
            </label>
            <input id="days" type="number" {...register("TotalDays",{valueAsNumber: true})} className="col-span-3 p-2 border border-1 border-black rounded-md " />
            {errors.TotalDays && <div className="col-span-4 flex justify-center">{errors.TotalDays.message}</div>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="days" className="text-right">
              Working Days:
            </label>
            <div className="col-span-3"><WeekSelector workingDays={workingDayRef}/></div>
            {errors.root && <div className="col-span-4 flex justify-center">{errors.root.message}</div>}
            <div className="col-span-4 flex items-center justify-center">
              <button className="bg-black text-white rounded-full p-2" disabled={isSubmitting}>Add Activity</button>
            </div>
          </div>
        </div>
      </form>
  </DialogContent>
</Dialog>
<Toaster/>
</>
    )
}