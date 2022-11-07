
const nodemailer = require("nodemailer");
require("dotenv").config()

// async..await is not allowed in global scope, must use a wrapper
async function main()
{
    let transporter = nodemailer.createTransport({
        host: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.AUTH_USER, // generated ethereal user
            pass: process.env.AUTH_PASS, // generated ethereal password
        },
    });

    try
    {

        await transporter.sendMail({
            from: '"Fred Foo 👻" <sidheshpvalueaddsofttech.com>', // sender address
            to: "mahit1947nahi@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
    } catch (error)
    {
        throw new Error("Email id is not valid. Please check emai id")
    }


}

main().catch(error => console.log(error))
