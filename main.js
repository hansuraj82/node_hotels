const express = require('express');
const { json } = require('stream/consumers');
const db = require('./db')
const Person = require('./models/person');
const menuItem = require('./models/menuItem')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const port = 5500;

app.get('/',(req,res)=> {
    res.send("Hello sir how can i help You?");
})
// Routes for '/person' to get and post the data
const personRoutes = require('./routes/personRoutes')
app.use('/person',personRoutes);

//Routes for '/menuitems' to get and post the data
const menuitemsRoutes = require('./routes/menuItemsRoutes');
app.use('/menuitems',menuitemsRoutes);
//Post route to add a person
// app.post('/person',async(req,res) => {
//   try {
//     const personData = req.body; //Assuming the request body contains the person data

//   //create a new person document using the mongoose model
//   const newPerson = new Person(personData);

//   //save the new person to the database
//   const response = await newPerson.save()
   
        
  
//         console.log("Data Saved Successfully");
//         res.status(200).json(response);
    

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({error: "internal server error"})
//   }
// })

// //Get method to get the person

// app.get('/person',async(req,res) => {
//     try {
//         const data = await Person.find();
//         console.log("Data fetched Successfully");
//         res.status(200).json(data);

//     }catch(error) {
//     console.log(error)
//     res.status(500).json({error: "internal server error"});
//     }
// });


// // post route to add menuItems in the database
// app.post('/menuItems',async(req,res)=> {
//     try{
//        const menu = req.body;
//        const newMenuList = new menuItem(menu); 
//        const response = await newMenuList.save();
//        console.log("Data for menu List saved Successfully");
//        res.status(200).json(response);
//     } catch(error) {
//         console.log(error);
//         res.status(500).json({error: "internal server error while saving the data"})
//     }
// } );

// app.get('/menuItems',async(req,res)=> {
//     try {
//         const menuList = await menuItem.find();
//         console.log("Data for menuLIst fetched successfully");
//         res.status(200).json(menuList);
//     } catch(error) {
//       console.log(error);
//       res.status(500).json({error: "Internal server Error while fetching the data"});
//     }
// })

app.listen(port,()=> {
    console.log("i am live on the port 5500");
});

// // to get data by the help of work in Person.js

// app.get('/person/:worktype', async(req,res) => {
//     try {
//         const worktype = req.params.worktype;
//         if (worktype === 'chef' || worktype === 'manager' || worktype === 'waiter') {
//             // fetching data for worktype
//             const response = await Person.find({work: worktype});
//             console.log("Data fetched successfully")
//             res.status(200).json(response)
//         }
//         else {
//             res.status(404).json({'error' : 'Invalid Worktype'});
//         }
//     } catch(error) {
//         console.log(error);
//         res.status(500).json({'error':'internal server error'})
//     }
// } )

