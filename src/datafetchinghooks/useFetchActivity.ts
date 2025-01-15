import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URI } from "../assets/URI";

async function FetchActivity() {
 const res=await axios.get(`${URI}/user/activity`,{
    headers:{
        Authorization:localStorage.getItem("token")
    }
 })
 return res.data.msg
}


export function useFetchActivity() {
    const {data, isFetching, isLoading, error, isError}= useQuery({
        queryKey:["getActivity"],
        queryFn:FetchActivity,
        refetchOnWindowFocus:false,
        placeholderData:(prevData)=>prevData
    })
    return {
        data,
        isFetching, 
        isLoading, 
        error, 
        isError
    }
}