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

const workingDay=zod.enum(["Mon","Tue","Wed","Thu","Fri","Sat","Sun"])
export type enumArray=zod.infer<typeof workingDay>
export const activitySchema=zod.object({
        activity:zod.string(),
        totalDays:zod.number(),
        workingDays:zod.array(workingDay)
    })

export const updateUserSchema=zod.object({
    workingDays:zod.array(workingDay).optional(),
    activity: zod.string().optional()
})

export const dashboardSchema= zod.object({
    streak:zod.number()
})
