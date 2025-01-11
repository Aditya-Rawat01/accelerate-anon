import zod from 'zod'


export const userSignup=zod.object({
    username: zod.string().min(3,"Username must be greater than or equal to 3 characters"),
    email: zod.string().email("Provide valid Email").transform((val)=>val.toLowerCase()),
    password: zod.string().min(5, "Provide 5 or more characters")

})

export const userSignin=zod.object({
    email: zod.string().email("Provide valid Email").transform((val)=>val.toLowerCase()),
    password: zod.string().min(5, "Provide 5 or more characters")
})

const workingDay=zod.enum(["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"])
export const activitySchema=zod.object({
        activity:zod.string(),
        totalDays:zod.number(),
        workingDays:zod.array(workingDay)
    })