module.exports = function ()
{
    return async context =>
    {
        const householdId = context.data.household
        const householdService = context.app.service("/api/households");
        const household = await householdService.get(householdId)
        if (!household) throw new Error("Household with the given id is not found!")
        context.data.household = household._id;
        return context;
    }
}