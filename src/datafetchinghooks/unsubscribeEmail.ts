import { useMutation } from "@tanstack/react-query";
import { URI } from "../assets/URI";
import axios from "axios";


async function unsubEmail() {
    const res=await axios.post(`${URI}/dash/unsubscribeEmail`,{},{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    })
    localStorage.removeItem("token")
    return res.data.msg
}


export function useUnsubEmail() {
    return useMutation({
    mutationKey:["unsubEmail"],
    mutationFn:unsubEmail
    })
}