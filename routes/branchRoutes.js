const express = require('express');
const router = express.Router();
const hotel_branch = require('../models/hotel_branch');

//Define routes for branch

//Post method to post the data means branch details
router.post('/', async (req, res) => {
    try {
        const branch_details = req.body; // req.body contains the data to be submitted
        const newBranchDetais = new hotel_branch(branch_details);
        const response = await newBranchDetais.save();
        console.log("Data for Branch saved successfully");
        res.status(200).json(response);


    } catch (error) {
        console.log(error);
        res.status(500).json({ "Error": "Internal server Error" });
    }
});

//get method for branch to fetch the data for hotel_branch
router.get('/', async (req, res) => {
    try {
        const response = await hotel_branch.find();
        console.log("Data for hotel branch fetched successfully");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "Internal server Error" });
    }
});

//put(update) method to update data in branch details
router.put('/:branch_id', async (req, res) => {
    try {
        const branch_id = req.params.branch_id; // req.params.branch_id is the id used in url to update data for that id
        const updated_branch_details = req.body; // the data which is send to the server for updation
        // data to be updated by branch id
        const response = await hotel_branch.findByIdAndUpdate(branch_id, updated_branch_details, {
            new: true,
            runValidators: true
        });
        if (!response) {
            console.log("Branch Id Not Found");
            res.status(404).json({ 'Message': 'Branch Id Not Found' });
        } else {
            console.log("Branch Details Updated Successfully");
            res.status(200).json(response);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'error': "internal server error" });
    }
});

//Delete method to delete a branch
router.delete('/:branch_id', async (req, res) => {
    try {
        const branch_id = req.params.branch_id;
        const response = await hotel_branch.findByIdAndDelete(branch_id);
        // if there is not any branch id then there is no response and found error
        if (!response) {
            console.log('Branch Not Found for such Branch Id');
            res.status(404).json({ 'message': 'Branch Id Not Found' });
        }
        else {
            console.log('Branch Details deleted Sucessfully');
            res.status(200).json({ 'message': 'Branch Details deleted Sucessfully' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Internal Server Error' });
    }
})


module.exports = router;