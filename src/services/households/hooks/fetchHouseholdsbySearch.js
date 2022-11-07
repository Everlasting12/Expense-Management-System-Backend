module.exports = function ()
{
    return async context =>
    {

        if (context.params.query.name)
        {
            context.params.query.name = new RegExp(`${ context.params.query.name }`, "ig")
        }
        return context
    }
}