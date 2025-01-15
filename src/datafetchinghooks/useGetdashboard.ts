import { URI } from "@/assets/URI";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getDash() {
    try {
       const res=await axios.get(`${URI}/dash`,{headers:{
        Authorization:localStorage.getItem("token") 
    }})  
    return res.data.msg
    } catch (error) {
        throw error
    }
    
}




export function usGetDashboard() {
    return useQuery({
        queryKey:["getDash"],
        queryFn:getDash,
        refetchOnWindowFocus:false
    })
}