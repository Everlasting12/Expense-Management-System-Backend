const nodemailer = require("nodemailer");
require('dotenv').config()

const jwt = require("jsonwebtoken")


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
        const userService = context.app.service("/forgetpassword")
        const userInfo = await userService.find({ query: { email: context.data.email } })
        if (userInfo.data[0])
        {
            const user = userInfo.data[0]
            const token = jwt.sign({ _id: user._id }, "pn0ftsphwMtEagcT1Hc0/RiY5qk=", { expiresIn: "20m" })
            const setResetlink = await userService.patch(user._id, { resetLink: token })
            if (setResetlink)
            {
                const currentDate = new Date().getTime() + (20 * 60 * 1000)


                let mailOptions = {
                    from: '"noreply@exms.com" <sidheshp@valueaddsofttech.com>',
                    to: user.email,  // separated by comma like: "abc@g.com, xyz@h.com"
                    subject: `Forgot Password! - EXMS`,
                    html: `Dear ${ user.firstName + " " + user.lastName },
                    <br />
                    <br />
Kindly find the reset password link below:
<br />
<br />
<br />

<a href="${ process.env.REACT_APP_URL }exms/resetpassword/${ token }" style="padding:10px 15px;color:white;text-decoration:none; border-radius:8px;background-color:blue">Reset Password Link</a>

<br />
<br />
This reset password URL above is only valid for next 20 minutes i.e. ${ new Date(currentDate).toDateString() + " " + new Date(currentDate).toLocaleTimeString() }
<br />
<br />
<span style="font-style: italic;border-top: 1px solid gray;border-bottom: 1px solid gray;padding:5px 0px;margin:5px 0px;" >This is a system generated email. Please do not reply on it. </span>
<br />
<br />
Regards,
<br />
admin@exms.com`
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
            else
            {
                throw new Error("Could not send Reset Password Link to the User")
            }
        }
        else
        {
            throw new Error("User doesn't exist with the given Email ID")
        }
    }
}
