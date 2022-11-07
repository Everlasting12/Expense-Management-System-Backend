module.exports = function ()
{
    return async context =>
    {

        if (context.params.user.role !== "primary user") throw new Error("You are not authorized to create new Houshold")
        return context;
    }
}
