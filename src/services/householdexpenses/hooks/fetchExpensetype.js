module.exports = function ()
{
    return async context =>
    {
        const expenseTypeService = context.app.service("/api/expensetypes");
        const expenseType = await expenseTypeService.get(context.data.expensetypeId)
        if (!expenseType) throw new Error({ "message": "Expense type with given id is not found" })
        context.data.expensetype = expenseType._id;
        return context;
    }
}