import cron from 'node-cron'
import nodemailer from 'nodemailer'
import { prisma } from '..'
import { MailSelector } from './mailSelector'


export function emailScheduler() {
    cron.schedule("0 22,8 * * 1,5",async()=>{ /// “At 10:01 on Monday and Saturday.” 1 10 * * 1,6
        try {
            const users=await prisma.user.findMany({
                select:{
                  activity:true,
                  username:true,
                  email:true,
                  receiveEmail:true
                }
              })
              if (!users || users.length===0) {
                console.log("No users found")
                return
              }


            // choosing all people at once
            // Add more better logic for selecting users
              for (let i=0;i<users.length;i++) {
                const randomUser=users[i]
                if (randomUser.receiveEmail===false) {
                  continue 
                }
                if (randomUser.activity.length===0) {
                  console.log(`No activity found for user: ${randomUser.username}`)
                  continue
                }
  
                const randomActivity=randomUser.activity[Math.floor((Math.random()*randomUser.activity.length))].activity
                const text=MailSelector(randomUser.username,randomActivity)
                /// add more motivation email templates (sort of done)
                
                
                MailSender(randomUser.email,text)
              }
              
              
        } catch (error) {
            console.log("Error in email scheduler function")
        }
        
        
        },{
          scheduled:true,
          timezone:"Asia/Delhi"
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
        html:activity

    }

    transporter.sendMail(emailOptions,(err, info)=>{

        if (err) {
           console.log("Error occured while sending mails: ", err.message)
        }
         else {
            console.log(`Mail sent successfully at ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata"})}, info.response`)
        }
    })
}