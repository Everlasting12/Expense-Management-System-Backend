
const app = require("./src/app");

const usersService = app.service("/users")

const AdminDetails = {
    firstName: "Sidhesh",
    lastName: "Parab",
    email: "sidheshparab34@gmail.com",
    phone: "9594031893",
    userName: "sidheshparab123",
    password: "123456789",
    role: "admin",
    updatedBy: null,

}


async function addAdmin()
{
    const admin = await usersService.find({ query: { email: AdminDetails.email } })
    if (admin.total == 1)
    {
        // console.log(admin)
    }
    else
    {
        const admin = await usersService.create(AdminDetails)
    }
}
addAdmin()