const express = require("express");
const connectDB = require("./config/database");
const User = require('./models/user');
const { trusted } = require("mongoose");

const app = express();

app.use(express.json());


// Signup api - post /signup
app.post("/signup", async (req, res) => {
    console.log(req.body);
    // const user = new User({
    //     firstName: "Virat",
    //     lastName: "Kohli",
    //     emailId:"virat@gmail.com",
    //     password:"Virat@123"
    // })

    const user = new User(req.body);

    try {
        await user.save();
        // res.send("user added successfully!!!!!!");
        res.status(200).json({
            statusCode: 200,
            message: "User added successfully!!"
        })
    } catch (err) {
        res.status(400).json({
            statusCode: 400,
            message: "Error saving user!!",
            error: err.message
        })
    }

})

//get user by email
app.get('/user', async (req, res) => {
    const email = req.body.emailId;

    try {
        const user = await User.findOne({ emailId: email }).exec();
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                message: "User not found"
            });
        }

        res.status(200).json({
            statusCode: 200,
            message: "User found",
            user
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            message: "Error while finding user!!",
            error: err.message
        })
    }
})

//feed api - GET /feed -> get all thw users from the database
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});

        if (users.length === 0) {
            return res.status(200).json({
                statusCode: 200,
                message: "No users available. Please add some users.",
                data: []
            });
        }

        res.status(200).json({
            statusCode: 200,
            message: "Users fetched successfully.",
            data: users
        });

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Error while fetching users!",
            error: error.message
        });
    }
});


//update api 
app.patch('/user/:id', async (req, res) =>{
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {new: true});

        // console.log("Updated user :", updatedUser);

        if(!updatedUser){
           return  res.status(404).json({
                statusCode: 404,
                message: "User not found"
            })
        }

        res.status(200).json({
            statusCode: 200,
            message: "User updated successfully",
            data: updatedUser
        })
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            message: "Error while fetching users!",
            error: err.message
        });
    }
})

//delete api

app.delete('/user/:id', async(req, res) =>{
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if(!deletedUser){
            return res.status(404).json({
                statusCode: 404,
                message: "User not found"
            })
        }

        res.status(200).json({
            statusCode : 200,
            message: "User deleted successfully",
            deletedUser
        })
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            message: "error while deleting user",
            error: err.message
        })
    }
})

connectDB()
    .then(() => {
        console.log("Database connection established");

        app.listen(7777, () => {
            console.log("Server is successfully running on server 7777....");
        });


    })
    .catch((err) => {
        console.error("Database can not be connected!!!");
    });




