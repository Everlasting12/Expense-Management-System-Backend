const nodemailer = require("nodemailer");
require('dotenv').config()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS
    }
});


module.exports = function ()
{
    return async context =>
    {
        let { password } = context.data
        if (password)
        {
            let mailOptions = {
                from: '"noreply@exms.com" <sidheshp@valueaddsofttech.com>',
                to: context.result.email,  // separated by comma like: "abc@g.com, xyz@h.com"
                subject: `Reset Password Success! - EXMS`,
                text: `Dear ${ context.result.firstName + " " + context.result.lastName },
Your Reset Password request is successfully implemented!
kindly login with your newly set password.
${ process.env.REACT_APP_URL }login`
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
}