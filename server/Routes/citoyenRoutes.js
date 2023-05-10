const express = require('express');
const citoyenController = require('../Controllers/citoyenController');
const { signup, login, deleteCitoyen } = citoyenController ;
const citoyenAuth = require('../Middlewares/citoyenAuth')

const router = express.Router();


//signup endpoint
//passing the middleware function to the signup
router.post('/signup', citoyenAuth.saveCitoyen, signup);

// Define a route to delete a user
router.delete('/deleteCitoyen/:id', deleteCitoyen);

//login route
router.post('/login', login );


module.exports = router;
