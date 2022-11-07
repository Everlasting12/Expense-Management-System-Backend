module.exports = function ()
{
    return async context =>
    {
        const email = context.data.emailid
        const userService = context.app.service("/users")
        const user = await userService.find({ query: { email: email } })
        if (user.total == 1)
        {
            context.data.isRegistered = true
        }
        return context
    }
}