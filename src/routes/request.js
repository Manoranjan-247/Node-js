const express = require('express');

const requestRouter = express.Router();



//connection request sending api
requestRouter.post('/sendConnectionRequest', async(req, res) => {
    console.log("sending connection request");

    res.send("connection request send!")
})

module.exports = requestRouter;