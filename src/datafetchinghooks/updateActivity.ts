import { URI } from "@/assets/URI";
import { useMutation } from "@tanstack/react-query";
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
       throw new Error((error as any).response.data.msg ) 
    }
    
}


export function useUpdateActivity() {
 return useMutation({
    mutationKey:["update"],
    mutationFn:updateActivity
 })
}