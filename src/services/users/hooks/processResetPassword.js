const jwt = require("jsonwebtoken")

module.exports = function ()
{
    return async context =>
    {
        let { resetLink, password } = context.data
        if (password)
        {
            try
            {
                const decodedToken = jwt.verify(resetLink, "pn0ftsphwMtEagcT1Hc0/RiY5qk=")
                const userService = context.app.service("/forgetpassword")
                const user = await userService.get(decodedToken?._id)
                if (resetLink && resetLink.toString() === user.resetLink.toString())
                {
                    context.data.resetLink = ""
                }
                else
                {
                    throw new Error("Invalid reset Token or it is expired")
                }
            } catch (error)
            {
                throw new Error("Invalid reset Token or it is expired")
            }
        }

    }
}