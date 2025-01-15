import { URI } from "@/assets/URI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


async function completeActivity({activityId}:{activityId:number}) {
    try {
      const res=await axios.post(`${URI}/user/completed/${activityId}`,{},{
      headers:{
         Authorization:localStorage.getItem("token")
      }
    })
    return res.data.msg 
    } catch (error) {
       throw new Error((error as any).response.data.msg) 
    }
    
}


export function useCompleteActivity() {
    const queryClient=useQueryClient()
 return useMutation({
    mutationKey:["update"],
    mutationFn:completeActivity,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["getActivity"]})
      queryClient.invalidateQueries({queryKey:["getDash"]})
   }
 })
}