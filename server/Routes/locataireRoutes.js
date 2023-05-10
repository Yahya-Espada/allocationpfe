const express = require('express');
const locataireController = require('../Controllers/locataireController');
const {addLocataire,updateLocataire,deleteLocataire}= locataireController;
const locataireAuth = require('../Middlewares/locataireAuth')
const router = express.Router();

// Route to add a Locataire
router.post('/addLocataire', locataireAuth.saveLocataire , addLocataire);

// Route to update a Locataire by ID
router.put('/updateLocataire/:id', updateLocataire);

// Route to delete a Locataire by ID
router.delete('/deleteLocataire/:id', deleteLocataire);

module.exports = router;
