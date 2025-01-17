import { atom } from "recoil"


export const streakDateAtom=atom({
    key:"date",
    default:new Date()
})