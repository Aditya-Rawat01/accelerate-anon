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
import { useCompleteActivity } from "@/datafetchinghooks/completeActivity"

import { useNavigate } from "react-router-dom"

  
export function AlertBox({value, activityId}:{value:string,activityId:number}) {
    const {mutate, isPending}=useCompleteActivity()
    function Activityupdation() {
        mutate({activityId},{
          onSuccess:()=>{
            console.log("pkk")  
          }
        })
    }
    
    return (<>
    <AlertDialog>
        <AlertDialogTrigger className="w-44 h-12 border border-1 border-gray-700 rounded-full text-sm hover:bg-green-500 hover:border-none hover:text-white active:opacity-50 overflow-hidden">{value}</AlertDialogTrigger>
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
      </>
      )
}