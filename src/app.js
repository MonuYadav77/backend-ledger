const express = require('express');
const cookiesParser = require("cookie-parser");


const app = express(); // server instance 
app.use(express.json()); // middleware to parse JSON request bodies
app.use(cookiesParser()); // middleware to parse cookies
/**
 * Routes required 
 */
const authRouter = require('./routes/auth.routes');
const accountRouter = require('./routes/accounts.routes');
/**
 * Use the routers for handling specific routes.
 * The authRouter will handle all routes starting with /api/auth and accountRouter will handle all routes starting with /api/accounts.
 */

app.use("/api/accounts", accountRouter);
app.use("/api/auth",authRouter); // use auth routes for /api/auth endpoint


module.exports = app;