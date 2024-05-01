const mongoose = require('mongoose');

//Define the mongoDB connection url
const mongoURL = 'mongodb://127.0.0.1:27017/hotels' //Replace 'mydatabase' with your database name

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

