module.exports = function ()
{
    return context =>
    {
        if (!context.params.user.role === "primary user") throw new Error("You are not a primary user")
        else return context;
    }
}