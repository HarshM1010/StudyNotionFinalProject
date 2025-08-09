const transporter = require("../Config/mailer");
require("dotenv").config();
const mailSender = async(email,title,body) => {
    try{
        let info = await transporter.sendMail({
            from:`StudyNotion <"${process.env.MAIL_USER}">`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        console.log(info);
        return info;
    } catch(error) {
        console.log(error.message);
    }
}

module.exports = mailSender;