//set up passport with a local authentication strategy using a person model for username and password
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Person = require('./models/person');

passport.use(new LocalStrategy(async (USERNAME, PASSWORD, done) => {
    //authentication logic here
    try {
        const user = await Person.findOne({ username: USERNAME });
        // if user not found 
        if (!user) {
            console.log('user Not found')
            return done(null, false, { message: 'Incorrect username' })
        }
        //if user found in person schema data
        console.log('user found');
        const isPasswordMatch =  await user.comparePassword(PASSWORD);
        //if password matched with the user in person schema
        if (isPasswordMatch) {
            console.log("password Matched");
            return done(null,user);
        }
        else {
            console.log('Incorrect Password')
            return done(null,false,{message: 'Incorrect Password'});
        }


    } catch (error) {
        console.log(error);
        done(error)
    }

}));

// Exporting passport for use in main.js to authentication via username and password
module.exports = passport;