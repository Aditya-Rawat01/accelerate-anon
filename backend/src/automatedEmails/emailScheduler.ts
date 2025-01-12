import cron from 'node-cron'
import nodemailer from 'nodemailer'
import { prisma } from '..'


export function emailScheduler() {
    cron.schedule("* * * * *",async()=>{ /// change it from every minute to more rando value like every monday or sat or more customized ones
        try {
            const users=await prisma.user.findMany({
                select:{
                  activity:true,
                  username:true,
                  email:true
                }
              })
              if (!users || users.length===0) {
                console.log("No users found")
                return
              }


            // --------choose more than one person at a time -----------------
            // Add more better logic for selecting users
              const randomUser=users[Math.floor((Math.random()*users.length))] 

              if (randomUser.activity.length===0) {
                console.log(`No activity found for user: ${randomUser.username}`)
                return
              }

              const randomActivity=randomUser.activity[Math.floor((Math.random()*randomUser.activity.length))].activity
              const text=`Hi ${randomUser.username}, Hope you are doing well. You are doing great actually. Just by doing something, you are moving and by moving you are progressing. I see you are currently busy in this "${randomActivity}" activity. Wish you best to deliever this on time. Great day to you`
              /// add more motivation email templates
              
              
              MailSender(randomUser.email,text)
              
        } catch (error) {
            console.log("Error in email scheduler function")
        }
        
        
        })
}

function MailSender(email:string,activity:string) {
    const transporter=nodemailer.createTransport({
        secure:true,
        host:"smtp.gmail.com",
        port:465,
        auth:{
          user:process.env.MAIL,
          pass:process.env.MAIL_PASS
        }
    
      })

    const emailOptions={
        from:process.env.MAIL,
        to:email,
        subject:"Accelerate Anon",
        text:activity

    }

    transporter.sendMail(emailOptions,(err, info)=>{

        if (err) {
           console.log("Error occured while sending mails: ", err.message)
        }
         else {
            console.log("Mail sent successfully: ", info.response)
        }
    })
}