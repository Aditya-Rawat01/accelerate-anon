import { useNavigate } from "react-router-dom"
import { useUnsubEmail } from "../datafetchinghooks/unsubscribeEmail"

export function Logout() {
    const navigate=useNavigate()
    const {mutate, isPending}=useUnsubEmail()
    function DeleteToken() {
        mutate(undefined,{
            onSuccess() {
            navigate("/")
        }, onError() {
            console.log("Error while unsubscribing")
        }
    
    })
        
    }
    if (isPending) {
        return <>Redirecting To Homepage. Unsubscribed from Email Service</>
    }
    return (
       <button className="bg-red-400 p-3 rounded-full" onClick={DeleteToken}>Logout</button>)
}