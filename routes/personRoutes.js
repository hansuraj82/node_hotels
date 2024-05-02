const express = require('express');
const router = express.Router();
const Person = require('../models/person')



//Define routes for '/person'

//Post method for "/person"
router.post('/', async (req, res) => {
    //Handle post method
    try {
        const personData = req.body; //Assuming the req.body conatains the person data to be submitted

        // creating a new person using the mongoose model of Person
        const newPerson = new Person(personData);

        //save the newPerson to the database
        const response = await newPerson.save();

        console.log('Data for person saved successfully');
        res.status(200).json(response);




    } catch (error) {
        console.log(error);
        res.status(500).json({ "Error": "Internal server error" });
    }
})

// Get method for '/person
router.get('/', async (req, res) => {
    //Handle get method
    try {
        const data = await Person.find();
        console.log("Data for person fetched successfully");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'err': 'Internal Server Error' })
    }
})

//get method for /person/:Worktype means fetch data by their work type such as chef || manager || waiter
router.get('/:worktype', async (req, res) => {
    try {
        const workType = req.params.worktype;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            //fetching person data for some worktype
            const response  = await Person.find({work: workType});
            console.log("DAta By work of person fetched Successfully");
            res.status(200).json(response);
        } else {
            res.status(404).json({ 'error': 'workType not found' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ 'error': 'Internal server error' });
    }
})
 //put method for /person/:id means update the data to the given id which is given in parameter and return the updated data
 router.put('/:id', async (req,res) => {
    const person_id = req.params.id; // extract the id from the url parameter
    const updatedPersonData = req.body; // updated data for the person which is submitted by the user
    //update the data by person_id
    const response = await Person.findByIdAndUpdate(person_id,updatedPersonData, {
        new : true,
        runValidators: true
    });
    if(!response) {
        res.status(404).json({'Error':'Person Not Found'});
    }
    console.log("Person's Data Updated Successfully");
    res.status(200).json(response);


 })

module.exports = router;