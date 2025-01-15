import { URI } from "@/assets/URI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


async function postActivity({data,ref}:{data: {
    activity: string;
    TotalDays: number;
}, ref:any
}) {
    try {
        console.log(ref.current)
        const res=await axios.post(`${URI}/user/activity`,{
              activity:data.activity,
              totalDays:data.TotalDays,
              workingDays:ref
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



export function usePostActivity() {
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:postActivity,
        onSuccess:()=>{queryClient.invalidateQueries({queryKey:["getActivity"]})}
    })
}