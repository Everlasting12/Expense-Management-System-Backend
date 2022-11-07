module.exports = function ()
{
    return async context =>
    {

        context.data.createdBy = context.params.user._id
        return context;
    }
}