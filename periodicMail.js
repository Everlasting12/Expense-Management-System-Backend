const nodemailer = require("nodemailer");
const cron = require('node-cron');
const app = require("./src/app");

const periodicPaymentsService = app.service("/api/periodicpayments")
const householdsService = app.service("/api/households")
const householdmembersService = app.service("/api/householdmembers")
const usersService = app.service("/users")


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: app.get("auth_user"),
        pass: app.get("auth_pass")
    }
});

async function getData()
{

    const periodicPayments = await periodicPaymentsService.find({ query: {} })
    const Households = await householdsService.find({ query: {} })
    const HouseholdMembers = await householdmembersService.find({ query: {} })
    const Users = await usersService.find({ query: {} })

    let uniqueHousehold = []
    Households.data.forEach(household =>
    {
        HouseholdMembers.data.forEach(householdMember =>
        {
            if (household._id.toString() === householdMember.household.toString())
            {


                const index = uniqueHousehold.findIndex(ch => ch.household.toString() == household._id.toString())

                if (index != -1)
                {
                    const user = Users.data.find(u => u._id.toString() == householdMember.user.toString())


                    uniqueHousehold[index].member = [...uniqueHousehold[index].member, user.email]
                }
                else
                {
                    const user = Users.data.find(u => u._id.toString() == householdMember.user.toString())
                    const puser = Users.data.find(u => u._id.toString() == household.createdBy.toString())

                    uniqueHousehold.push({
                        household: household._id,
                        householdName: household.name,
                        member: [user.email, puser?.email],
                    })
                }
            }

        })
    })


    let newEmailData = []

    periodicPayments.data.forEach(pp =>
    {
        uniqueHousehold.forEach(uh =>
        {
            if (pp.household.toString() === uh.household.toString())
            {
                newEmailData.push({
                    household: pp.household,
                    householdName: uh.householdName,
                    member: uh.member,
                    periodicExpense: pp.description,
                    duedate: pp.dueDate,
                    amount: pp.amount,
                    mailtoSendOn: pp.frequency == "weekly" ? new Date(pp.dueDate - (2 * 86400000)) : new Date(pp.dueDate - (15 * 86400000))
                })
            }
        })
    })
    // console.log(newEmailData)

    newEmailData.forEach(item =>
    {
        let mailOptions = {
            from: '"noreply@exms.com" <sidheshp@valueaddsofttech.com>',
            to: item["member"].join(", "),  // separated by comma like: "abc@g.com, xyz@h.com"
            subject: 'Reminder - ' + item["householdName"] + " Expenses",
            text: `A Gentle reminder of the ${ item["periodicExpense"] } of ₹ ${ item["amount"] }`
        };

        if (new Date().toISOString().split("T")[0] == item.mailtoSendOn.toISOString().split("T")[0])
        {
            console.log(item)
            transporter.sendMail(mailOptions, function (error, info)
            {
                if (error)
                {
                    console.log(error);
                } else
                {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    })

}

cron.schedule('06 19 * * *', () =>
{

    getData()

});
// cron.schedule('*/5 * * * * *', () =>
// {
//     const todaysDate = new Date()
//     getData(todaysDate)

// });

