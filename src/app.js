const express = require('express');
const cookiesParser = require("cookie-parser");
const authRouter = require('./routes/auth.routes');


const app = express(); // server instance 
app.use(express.json()); // middleware to parse JSON request bodies
app.use(cookiesParser()); // middleware to parse cookies

app.use("/api/auth",authRouter); // use auth routes for /api/auth endpoint
module.exports = app;