console.log("i am in server.js");
let name = "user";
const greet = (name) => {
    console.log("Hi " + name + " welcome to the server");
}
module.exports = {
    name,
    greet
}

// const Ram = require("./main");
// console.log("Hello World",Ram);













// const express = require('express')
// const app = express()
// const port = 5500

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/contact',(req,res) => {
//     res.send("i am a contact page");
// })

// app.get('/home',(req,res) => {
//     res.send("i am a home page");
// })

// app.get('/home/ram',(req,res) => {
//     res.send("i am home page Ram ")
// })

// app.get('/home/:slug',(req,resolve) => {
//     console.log(req.params)
//     console.log(req.query)

//     resolve.send(`hello ${req.params.slug}`)
// })

// app.listen(port, () => {
//   console.log(`i am live on ${port} wala local host`);
// })



