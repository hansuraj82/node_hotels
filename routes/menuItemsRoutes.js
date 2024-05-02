const express = require('express');
const router = express.Router();
const menuItems = require('../models/menuItem');

// Define routes for '/menuitems'

//post method for '/menuitems'
router.post('/',async (req,res) => {
    try {
        const menuitemsData = req.body;// assuming that req.body contains the data for posting to the database
        
        //create a new object for menuitems and pass the menuitemsData as parameter and the data stored in the new object
        const newMenuList = new menuItems(menuitemsData);

        //save the new menuList to the database
        const response = await newMenuList.save();
        res.status(200).json(response);

    } catch(error) {
        console.log(error);
        res.status(500).json({"error": "internal server error"});
    }
})


//get method for '/menuitems'
router.get('/', async(req,res) => {
    try {
        const response = await menuItems.find();
        res.status(200).json(response)
    } catch(error) {
        console.log(error);
        res.status(500).json({"error": "Internal server Error"});
    }

});

// get method for '/menuitems/:taste
router.get('/:taste', async (req,res) => {
    try {
        const itemtaste = req.params.taste;
        if(itemtaste == 'sour' || itemtaste == 'spicy' || itemtaste == 'sweet' || itemtaste == 'bitter') {
            const response = await menuItems.find({taste:itemtaste})
            console.log("Item(s) found for such taste")
            res.status(200).json(response);
        } else {
            res.status(404).json({'Error': 'Items Not found'})
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({"Error": "internal server Error"});
    }
})

//put method to update a specific part of menulist items 
router.put('/:food_id', async(req,res) => {
    try {
        const foodId = req.params.food_id; // id of that food item which we want to update
        const updated_food_data = req.body // the data to be updated for  fooditem 
        // 
        const response = await menuItems.findByIdAndUpdate(foodId,updated_food_data, {
            new: true,
            runValidators: true
        });
        // checking that response for valid id
        if(!response) {
            console.log("food Item not found");
            res.status(404).json({'Error': 'food Item not found'});
        }
        console.log("Food item's data updated Successfully");
        res.status(200).json(response);
    }catch(error) {
        console.log(error);
        res.status(500).json({'Error':'Internal Server Error'});
    }
})

// delete method to delete data
router.delete('/:food_id', async(req,res) => {
    try{
        const food_id = req.params.food_id; // ID of that food items which is to be deleted
    const deletedFoodItem = await menuItems.findByIdAndDelete(food_id);
    //if there is no deleted food item due to not found of any food item 
    if(! deletedFoodItem) {
        console.log("food item not found");
        res.status(404).json({'Error': 'food item not found'});
    }
    // if foodItem successfully deleted
    console.log("food Item Deleted successfully");
    res.status(200).json({'Message':'Food Item Delted Successfully'})

} catch(error) {
    console.log(error);
    res.status(500).json({'Error': 'Internal Server Error'})
}
})

// Export the router to use in main.js
module.exports = router;