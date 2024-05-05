const express = require('express');
const { json } = require('stream/consumers');
const db = require('./db')
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;
const passport = require('./auth');


// Middleware function for logging time and url requested by the user
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()} Request Made to : ${req.originalUrl}]`);
    next(); // Move to the next phase
}



//using log Request to know the time and url which is requested by the client
app.use(logRequest);

//using passport middleware to authenticate a legal user
app.use(passport.initialize());
const LocalAuthMiddleware = passport.authenticate('local',{session: false});

//when the client not use any thing in url and only hit get request on 3000 PORT or the link -->"https://hotel-5met.onrender.com"
app.get('/' ,(req, res) => {
    console.log("server started successfully");
    res.send("Hello sir how can i help You?");
})

// Routes for '/person' to get and post the data
const personRoutes = require('./routes/personRoutes')
app.use('/person',LocalAuthMiddleware, personRoutes);

//Routes for '/menuitems' to get and post the data
const menuitemsRoutes = require('./routes/menuItemsRoutes');
app.use('/menuitems', menuitemsRoutes);

//Routes for branch_details
const branchRoutes = require('./routes/branchRoutes');
app.use('/branch', branchRoutes);

app.listen(PORT, () => {
    console.log(`i am live on the port ${PORT}`);
});



