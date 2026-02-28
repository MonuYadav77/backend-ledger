const accountModel = require("../models/account.model");

/**
 * controller for creating an account for a user. It takes the user id from the request body and creates an account for that user. The account is created with the status "ACTIVE" and the currency "INR". The account is then saved to the database and the response is sent back to the client with the account details.
 */

async function createAccountController(req, res){
    const user = req.user; // Get the authenticated user from the request object

    const account = new accountModel.create({
        user: user._id, // Associate the account with the authenticated user's ID

    })
    res.status(201).json({
        account
    })
}

module.exports = {
    createAccountController
}