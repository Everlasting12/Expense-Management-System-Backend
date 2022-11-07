module.exports = function ()
{
    return async context =>
    {
        context.params.query.name = new RegExp(`${ context.params.query.name }`, "ig")
    }
}