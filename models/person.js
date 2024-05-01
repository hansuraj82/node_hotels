const mongoose = require('mongoose');

//Define the person schema
const person_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
    type: String,
    enum: ["chef","manager","waiter"],
    required: true
    },
    address: {
        type: String
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
    

})

// Create person Model
const Person = mongoose.model('Person',person_schema);
module.exports = Person;