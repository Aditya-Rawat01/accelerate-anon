import { useNavigate } from "react-router-dom"
import { useUnsubEmail } from "../datafetchinghooks/unsubscribeEmail"

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
       <button className="bg-red-400 p-3 rounded-full" onClick={DeleteToken}>Logout</button>)
}