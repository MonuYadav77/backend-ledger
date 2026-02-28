const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");

const router = express.Router();

/**
 * POST /api/accounts/ - Create a new account for the authenticated user. The request body should contain the user id for which the account is to be created. The account will be created with the status "ACTIVE" and the currency "INR". The response will contain the details of the created account.
 */

// the middleware file exports the function directly, so just pass it instead of accessing a property
router.post("/", authMiddleware, accountController.createAccountController);



module.exports = router;