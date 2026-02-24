const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log("Server is connected to the database");
    })
    .catch(err =>{
        console.log("Error connecting to the database", err);
        process.exit(1); // Exit the process with an error code
    })
}
module.exports = connectDB;