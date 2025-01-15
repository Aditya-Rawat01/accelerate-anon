import { URI } from "@/assets/URI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


async function updateActivity({activityId,progress}:{activityId:number,progress:number}) {
    try {
      const res=await axios.post(`${URI}/user/progress/${activityId}`,{
    progress:progress
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


export function useUpdateActivity() {
   const queryClient=useQueryClient()
 return useMutation({
    mutationKey:["update"],
    mutationFn:updateActivity,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["getActivity"]})
   }
 })
}