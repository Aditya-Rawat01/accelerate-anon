import { URI } from "@/assets/URI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


async function deleteActivity({activityId}:{activityId:number}) {
    try {
      const res=await axios.delete(`${URI}/user/delete/${activityId}`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    })  
    return res.data.msg
    } catch (error) {
        throw error
    }
    

}





export function useDeleteActivity() {
    const queryClient=useQueryClient()
 return useMutation({
    mutationKey:["delete"],
    mutationFn: deleteActivity,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["getActivity"]})
    }
 }
)
}