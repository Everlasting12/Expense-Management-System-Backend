module.exports = function ()
{
    return async context =>
    {
        context.data.updatedBy = context.params.user._id
        return context;
    }
}