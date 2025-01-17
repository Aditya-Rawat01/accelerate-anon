import { useNavigate } from "react-router-dom"
import { useUnsubEmail } from "../datafetchinghooks/unsubscribeEmail"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export function Logout() {
    const navigate=useNavigate()
    const {mutate, isPending, isError, error}=useUnsubEmail()
    function DeleteToken() {
        mutate(undefined,{
            onSuccess() {
            navigate("/")
        }
    
    })
        
    }
    if (isPending) {
        return <>Redirecting To Homepage. Unsubscribed from Email Service</>
    }
    if (isError) {
        return <>{error.message}. Try refreshing page</>
    }
    return (
        <AlertDialog>
                                    <AlertDialogTrigger className="w-20 absolute top-3 right-4 h-8 border border-1 rounded-full text-sm hover:bg-white hover:text-black">Logout</AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure? Logging out means from now on you will not receive any emails from our side. 
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={DeleteToken} disabled={isPending}>{isPending?"Completing the activity...":"Continue"}</AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
    )}


                                    