const express = require("express");
const connectDB = require("./config/database");
const User = require('./models/user')

const app = express();

app.post("/signup", async (req, res) =>{
    const user = new User({
        firstName: "Virat",
        lastName: "Kohli",
        emailId:"virat@gmail.com",
        password:"Virat@123"
    })

    try {
        await user.save();

    res.send("user added successfully!!!!!!");
    } catch (error) {
        res.status(400).send("Error saving the user : " + error.message)
    }
    
})

connectDB()
    .then(() => {
    console.log("Database connection established");

    app.listen(7777, ()=>{
        console.log("Server is successfully running on server 7777....");
    });

    
    })
    .catch((err) => {
        console.error("Database can not be connected!!!");
    });




