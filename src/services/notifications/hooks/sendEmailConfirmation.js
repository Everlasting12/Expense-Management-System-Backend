const nodemailer = require("nodemailer");
require("dotenv").config()


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
    },
});

module.exports = function ()
{
    return async context =>
    {
        await transporter.sendMail({
            from: '"EXMS Notification" <sidheshp@valueaddsofttech.com>',
            to: context.result.emailid,
            subject: "Issued @EXMS Ticket No.: #" + context.result.issueNumber,
            html: `
                <html>
                    <head>
                        <style>
                        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
                        </style>
                    </head>
                    <body>
                    <div style="width:100%;font-family: 'Roboto'; font-size:1rem;font-weight:500;">                
                        <div style="width:50%;margin:0px auto;padding:20px;">
                            <p>Hello ${ context.result.firstName } ${ context.result.lastName },</p>
                            <p>Your issue #${ context.result.issueNumber } is successfully registered on our portal. <br/>
                                We will connect with you shortly. <br/><br/>
                            Sincerely,<br/>
                            The Expense Management System team
                            </p>
                        </div>
                    </div>
                    </body>
                <html>`,
        });

    }
}





