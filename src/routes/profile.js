const express = require('express');
const { userAuth } = require('../middlewares/auth')


const profileRouter = express.Router();

// GET /profile - Protected route
profileRouter.get('/view', userAuth, async (req, res) => {
  try {
    const user = req.user;

    // Optional: remove sensitive fields before sending the user object
    const { password, ...safeUser } = user.toObject ? user.toObject() : user;

    res.status(200).json({
      statusCode: 200,
      message: "Fetched profile data successfully",
      data: safeUser,
    });

  } catch (error) {
    console.error("Error fetching profile:", error.message);

    res.status(500).json({
      statusCode: 500,
      message: "Something went wrong while fetching profile",
      error: error.message,
    });
  }
});

//profile edit api
profileRouter.patch("/edit", userAuth, async (req, res) => {

  try {
    //data sanitization 
    validatePrfileEditData(req);
    
  } catch (error) {

  }




})


module.exports = profileRouter;