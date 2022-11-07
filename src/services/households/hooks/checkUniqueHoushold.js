module.exports = function ()
{
    return async context =>
    {
        const householdService = context.app.service("/api/households");

        const houshold = await householdService.find({ query: { name: context.data.name } })
        if (houshold.total >= 1 && houshold.data.length >= 1) throw new Error("Houshold already exist with the same name")
        else return context
    }

}