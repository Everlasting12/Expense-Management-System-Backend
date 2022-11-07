module.exports = function ()
{
    return context =>
    {
        if (context.params.user.role !== "admin") throw new Error("Access Forbidden")
        else return context;
    }
}