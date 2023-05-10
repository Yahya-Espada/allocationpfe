const db = require('../Models');
const { QueryTypes } = require('sequelize');
const Locataire = db.locataire;

// Define a controller method to add a Locataire
const addLocataire = async (req, res) => {
    try {
      const { cin_locataire, nom_locataire, prenom_locataire, adresse_locataire, telephone_locataire, email_locataire } = req.body;
  
      const data = {
        cin_locataire,
        nom_locataire,
        prenom_locataire,
        adresse_locataire,
        telephone_locataire,
        email_locataire,
      };
      // Saving the locataire
      const locataire = await Locataire.create(data);
  
      if (locataire) {
        console.log('locataire', JSON.stringify(locataire, null, 2));
        // Send locataire details
        return res.status(201).send(locataire);
      } else {
        return res.status(409).send('Details are not correct');
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Failed to add locataire'
      });
    }
  };
  
  // Define a controller method to delete a Locataire
  const deleteLocataire = async (req, res) => {
    const LocataireID = req.params.id;
  
    try {
      // Find the Locataire by ID and delete it
      const result = await db.sequelize.query(`DELETE FROM "locataire" WHERE "id_locataire" = '${LocataireID}'`, { type: QueryTypes.DELETE });
  
      // If the Locataire was successfully deleted, return a success response
      if (Locataire) {
        return res.status(200).json({
          message: 'Locataire deleted successfully'
        });
      }
  
      // If the Locataire was not found, return a 404 response
      return res.status(404).json({
        message: 'Locataire not found'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Failed to delete Locataire'
      });
    }
  };
  
// Define a controller method to update a Locataire
const updateLocataire = async (req, res) => {
    const LocataireID = req.params.id;
  
    try {
      // Find the Locataire by ID
      const locataire = await Locataire.findOne({ where: { id_locataire: LocataireID } });
  
      if (locataire) {
        // Update the Locataire with the new data
        const { cin_locataire, nom_locataire, prenom_locataire, adresse_locataire, telephone_locataire, email_locataire } = req.body;
  
        const data = {
          cin_locataire,
          nom_locataire,
          prenom_locataire,
          adresse_locataire,
          telephone_locataire,
          email_locataire,
        };
  
        await locataire.update(data);
  
        console.log('locataire', JSON.stringify(locataire, null, 2));
        // Send the updated Locataire details
        return res.status(200).send(locataire);
      }
  
      // If the Locataire was not found, return a 404 response
      return res.status(404).json({
        message: 'Locataire not found'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Failed to update Locataire'
      });
    }
  };
  
  module.exports = {
    addLocataire,
    deleteLocataire,
    updateLocataire,
  };
  