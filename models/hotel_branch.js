const mongoose = require('mongoose');

//Define hotel_branch schema

const hotel_branch_schema = new mongoose.Schema({
    branch_address: {
        type: String,
        required: true
    },
    manager: {
        type:String,
        required: true
    },
    manager_email: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        enum: [0,1,2,3,4,5],
        default: 3
    }
})

// create a model
const hotel_branch = mongoose.model('hotel_branch_info',hotel_branch_schema);
//Exporting the hotel_branch schema 
module.exports = hotel_branch;