require('dotenv').config(); // Load environment variables from .env file
const app = require('./src/app');
const connectToDB = require('./src/config/db');

connectToDB(); // Connect to the database



//to start the server
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
