
require("dotenv").config()
const fetch = require('cross-fetch');

module.exports = function ()
{
    return async context =>
    {




        // const result = await fetch('https://api.zerobounce.net/v2/validate?api_key=6fbee67672864b89a882d36debac751e&email=' + context.data.emailid)
        const result = await fetch('https://emailvalidation.abstractapi.com/v1/?api_key=48ccc7cd6b24460a8ba612b737ad8f94&email=' + context.data.emailid)
        const data = await result.json()

        if (data.deliverability === "UNDELIVERABLE" || data.status === "invalid")
        {
            throw new Error("Email ID does not exists. \nPlease enter correct Email ID.");
        }
        context.data.issueNumber = Date.now().toString();
        return context;

    }
}





