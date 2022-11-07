const nodemailer = require("nodemailer");
require('dotenv').config()

module.exports = function ()
{
    return async context =>
    {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.AUTH_USER,
                pass: process.env.AUTH_PASS
            }
        });

        let mailOptions = {
            from: '"noreply@exms.com" <sidheshp@valueaddsofttech.com>',
            to: context.result.email,  // separated by comma like: "abc@g.com, xyz@h.com"
            subject: `Welcome to EXMS!`,
            html: `
<div style="width:100%;border-radius:10px;background-color:#F8FAFC;padding:20px">
    <p>Dear ${ context.result.firstName } ${ context.result.lastName },</p>
    <div style="margin:20px 0px">
        <p>Welcome to the EXMS portal!</p>
        <p>Congratulations! 🎉 Your registration has been successful and you can now login to the portal.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <br />
        <a href="${ process.env.REACT_APP_URL }login" style="padding:10px 15px;color:blue;text-decoration:none; border-radius:8px;background-color:white">LOGIN</a> 
        <br />
        <br />
        <p style="font-style: italic;border-top: 1px solid gray;border-bottom: 1px solid gray;padding:5px 0px;margin:5px 0px;" >This is a system generated email. Please do not reply on it. </p>
        <br />
        <p>Regards,</p>
        <p>admin@exms.com</p>
    </div>
</div>            
`
        };

        transporter.sendMail(mailOptions, function (error, info)
        {
            if (error)
            {
                console.log(error);
            } else
            {
                console.log('Email sent: ' + info.response);
            }
        });
    }

}