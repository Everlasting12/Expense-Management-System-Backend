module.exports = function ()
{
    return async context =>
    {

        if (context.params.query.role && context.params.query._id)
        {
            delete context.params.query.email

            console.log(context.params.query)
            context.params.query = {
                ...context.params.query,
                _id: { $nin: [context.params.query._id] }
            }
        }
        if (context.params.query.fullname)
        {
            context.params.query = {
                $or: [
                    { firstName: new RegExp(`^${ context.params.query.fullname }`, "i") },
                    { lastName: new RegExp(`^${ context.params.query.fullname }`, "i") }
                ]
            }
        }
        return context
    }
}