module.exports = function ()
{
    return async context =>
    {
        const householdService = context.app.service("/api/households");
        const household = await householdService.get(context.data.householdId)
        if (!household) throw new Error("Expense type with given id is not found")
        context.data.household = household._id;
        return context;
    }
}