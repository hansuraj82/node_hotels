const mongoose = require('mongoose');
require('dotenv').config();
//Define the mongoDB connection url
//const mongoURL = process.env.MONGODB_URL_LOCAL //Replace 'mydatabase' with your database name
const mongoURL = process.env.MONGODB_URL; 
//Set up mongoDB connections
mongoose.connect(mongoURL,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})

//Get the Default Connection
//Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

//Define event Listener for database connection
db.on('connected',()=> {
    console.log("connected To MongoDB Server")
})

db.on('disconnected',()=> {
    console.log("MongoDB Disconnected")
})

db.on('error',()=> {
    console.log("MongoDB connection Error")
})

//Export the database connection
module.exports = db;

