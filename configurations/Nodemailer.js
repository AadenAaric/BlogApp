const nodemailor = require("nodemailer");

//Creating a transporter which will configure nodemailer with our specified Email platform:

const SendEmail = async ()=>{
    try {
        const transporter = nodemailor.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user:"zixzax301@gmail.com",
                pass:'rlrbccjmssbufmyx'
            }
        })
        
        const message = {
            to,
            subject:"You have a new Mail from Nodemailer!",
            html:`
            <h1>You have a new Nodemailer Email!</h1>
            <p>${messageContent}</p>
            `,
        }

        const info = await transporter.sendMail(message);
        console.log("Message Sent: "+ info.messageId);

    } catch (error) {
        console.log(`Message didnt send ${error}`);
    }
}

module.exports = {
    SendEmail,
}