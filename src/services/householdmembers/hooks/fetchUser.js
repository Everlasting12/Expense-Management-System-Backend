module.exports = function ()
{
    return async context =>
    {
        const userId = context.data.user
        const userService = context.app.service("/users");
        const user = await userService.get(userId)
        if (!user) throw new Error("User with the given id is not found!")
        context.data.user = user._id;
        return context;
    }
}