import { URI } from "@/assets/URI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type props ={
    activity:string,
    totalDays:number,
    workingDays:string[], 
    currentDay:number,
    activityId:number
}
async function renameActivity({activity,totalDays,workingDays, currentDay, activityId}:props) {
    let progress=Math.round((currentDay/totalDays)*100)
    if (currentDay>totalDays) {
        progress=100 
        totalDays=currentDay
    }
    try {
        const res=await axios.post(`${URI}/user/update/${activityId}`,{
            workingDays,
            totalDays,
            activity,
            progress
    },{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    })
        return res.data.msg
    } catch (error) {
        throw error
    }
    
}



export function useRenameActivity() {
    const queryClient=useQueryClient()
    return useMutation({
        mutationKey:["rename"],
        mutationFn:renameActivity,
        onSuccess:()=>{queryClient.invalidateQueries({queryKey:["getActivity"]})}
    
    })
    
}