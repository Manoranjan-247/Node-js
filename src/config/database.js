const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://manoranjanparida:dE0IMuJ30VYLysKv@cluster0.v05nwot.mongodb.net/devTinder'); // connect to the cluster
};

module.exports = connectDB;

