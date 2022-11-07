module.exports = function ()
{
    return async context =>
    {
        const householdId = context.data.household
        const userId = context.data.user
        const householdMembersService = context.app.service("/api/householdmembers");
        const userService = context.app.service("/users");
        const user = await userService.get(userId)
        const householdService = context.app.service("/api/households");
        const household = await householdService.get(householdId)
        const householdMember = await householdMembersService.find({
            query: {
                household: householdId,
                user: userId
            }
        })
        if (householdMember.total == 1) throw new Error(`${ user.firstName + " " + user.lastName } is already added in the ${ household.name }`)

        return context;
    }
}