// services/auth-management/notifier.js
const mailer = require('feathers-mailer');
// const app = require('../../app');

const transporter = {
    service: "gmail",
    auth: {
        user: process.env.AUTH_USER, // generated ethereal user
        pass: process.env.AUTH_PASS// generated ethereal password
    }
};


module.exports = (app) =>
{
    app.use('mailer', mailer(transporter, { from: "sidheshp@valueaddsofttech.com" }));
    function getLink(type, hash)
    {
        return "https://blooming-brushlands-42033.herokuapp.com/exms" + type + "?token=" + hash;
        // return "http://localhost:3000/exms" + type + "?token=" + hash;
    }

    async function sendEmail(email)
    {

        return app.service('mailer').create(email).then(function (result)
        {
            console.log('Sent email', result)
        }).catch(err =>
        {
            console.log('Error sending email', err)
        })
    }

    return (type, user, notifierOptions = {}) =>
    {
        if (type === "resendVerifySignup")
        {
            console.log({ user })
            return sendEmail({
                from: "sidheshp@valueaddsofttech.com",
                to: user.email,
                subject: "Please confirm your e-mail address",
                text: "Click here: " + getLink("/activate-account", user.verifyToken),
            });
        } else if (type === "verifySignup")
        {
            return sendEmail({
                from: "sidheshp@valueaddsofttech.com",
                to: user.email,
                subject: "E-Mail address verified",
                text: "Registration process complete. Thanks for joining us!",
            });
        }
        else if (type === 'sendResetPwd')
        {
            tokenLink = getLink('/resetpassword/reset', user.resetToken)
            return sendEmail({
                from: "sidheshp@valueaddsofttech.com",
                to: user.email,
                subject: "Reset Password - EXMS",
                text: "Reset Password link: " + tokenLink,
            })
        } else if (type === 'resetPwdLong')
        {
            // tokenLink = getLink('reset', user.resetToken)
            return sendEmail({
                from: "sidheshp@valueaddsofttech.com",
                to: user.email,
                subject: "Password Reset Success",
                text: "Password reset successful. you can login now",
            })
        }
    };
};
