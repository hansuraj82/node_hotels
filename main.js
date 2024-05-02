const express = require('express');
const { json } = require('stream/consumers');
const db = require('./db')
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 5500

app.get('/',(req,res)=> {
    res.send("Hello sir how can i help You?");
})
// Routes for '/person' to get and post the data
const personRoutes = require('./routes/personRoutes')
app.use('/person',personRoutes);

//Routes for '/menuitems' to get and post the data
const menuitemsRoutes = require('./routes/menuItemsRoutes');
app.use('/menuitems',menuitemsRoutes);


app.listen(PORT,()=> {
    console.log("i am live on the port 5500");
});



