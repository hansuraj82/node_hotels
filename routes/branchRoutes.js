const express = require('express');
const router = express.Router();
const hotel_branch = require('../models/hotel_branch');

//Define routes for branch

//Post method to post the data means branch details
router.post('/', async(req,res)=> {
    try {
        const branch_details = req.body; // req.body contains the data to be submitted
        const newBranchDetais = new hotel_branch(branch_details);
        const response = await newBranchDetais.save();
        console.log("Data for Branch saved successfully");
        res.status(200).json(response);

        
    } catch (error) {
        console.log(error);
        res.status(500).json({"Error":"Internal server Error"});
    }
});

//get method for branch to fetch the data for hotel_branch
router.get('/', async(req,res) => {
    try {
        const response = await hotel_branch.find();
        console.log("Data for hotel branch fetched successfully");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({"error": "Internal server Error"});
    }
});

module.exports = router;