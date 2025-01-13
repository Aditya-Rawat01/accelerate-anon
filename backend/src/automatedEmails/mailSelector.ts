export function MailSelector(username:string, activity:string) {
    const templateArr=[template1,template2,template3,template4,template5]
        
        
    
    const template=Math.floor(Math.random()*5)
    return templateArr[template](username,activity)
}

function template1(username:string, activity:string) {
 return `<div style="font-size: 16px;"> Hi ${username}.<br> You are doing absolutely great. Hope you keep progressing in "${activity}".<br>Wishing you all the best 😁</div>`
}

function template2(username:string, activity:string) {
return `<div style="font-size: 16px;"> Hey ${username}. A traveller if rested is not said to be stationary. Likewise, a rest day doesn't mean the day wasted. Rest well and Keep progressing in "${activity}".<br>Happy Learning!😎😎</div>`
}

function template3(username:string, activity:string) {
return `<div style="font-size: 16px;"> A friend of mine said that work is eternal. You just make moments in between to live. Do you agree on this? ${username}. By the way, keep up the progress in "${activity}".<br>Till next time (●'◡'●)</div>`
}

function template4(username:string, activity:string) {
return `<div style="font-size: 16px;"> Accelerate ${username}. Noone gonna do it for you. Tbh, sleep is overrated. Try sleeping at 10 and then on 1. You will have same energy in morning. So why not put these hours in something worth doing? like  "${activity}".<br> Make sure to sleep for atleast 6 hrs though.🙂</div>`
}

function template5(username:string, activity:string) {
return  `<div style="font-size: 16px;"> Some days, I waste time on social media or webseries or conspiracy theories. Now to disract myself from the fact that I have wasted my time, I waste more time. But with the help of accelerate-anon, I get reminders to work. Long live accelerate-anon.<br> Apart from shamelessly plugging this on mail itself, Hey ${username}, Are you progressing in your "${activity}".<br> If yes, that's great! If No, then i guess this is why accelerate-anon was built. Here take motivation. 🥸🤓<br> Back to work</div>`
}