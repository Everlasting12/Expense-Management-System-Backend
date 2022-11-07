module.exports = function ()
{
    return async context =>
    {
        const periodicPaymentsService = context.app.service("/api/periodicpayments");
        const periodicPayment = await periodicPaymentsService.get(context.data._id)
        context.data = {
            ...periodicPayment,
            dueDate: context.data.dueDate,
            description: context.data.description,
            paidThrough: [...periodicPayment.paidThrough, context.data.paidThrough],
            paymentDetails: [...periodicPayment.paymentDetails, ...context.data.paymentDetails],
            paidBy: [...periodicPayment.paidBy, ...context.data.paidBy]
        }
        return context
    }
}