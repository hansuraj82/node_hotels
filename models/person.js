const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        enum: ["chef", "manager", "waiter"],
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
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }


});

// Hashing the password with the help of bcrypt 
// pre is a middleware function which executes when we save any data to database
person_schema.pre('save', async function (next) {
    const person = this;
    //Hash the password only if it is modified or new(new means a new data saving to the database)

    if (!person.isModified('password')) return next();
    try {
        // Hash password generation

        //generation salt for Hashing the password
        const salt = await bcrypt.genSalt(10);
        //Hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //override the password's plain text with hash one
        person.password = hashedPassword;


        //After saving the data successfully we call next function to jump to the next work 
        next();
    } catch (error) {
        console.log(error);
        return next(error);

    }

})

// we create a function in person schema to check the entered password by the user and the stored password in hashed formate
person_schema.methods.comparePassword = async function (candidatePassword) {
    try {
        // use bcrypt to compare the user entered password with the stored hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;

    } catch (err) {
        throw err;
    }
}



// Create person Model
const Person = mongoose.model('Person', person_schema);
module.exports = Person;