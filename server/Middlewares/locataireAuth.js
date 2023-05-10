const db = require('../Models');
const Locataire = db.locataire;

const saveLocataire = async (req, res, next) => {
  try {
    // Check if locataire with the given email exists
    const locataire = await Locataire.findOne({
      where: {
        email_locataire: req.body.email_locataire,
      },
    });

    if (!locataire) {
      // If no locataire found, respond with a status of 401
      return res.status(401).send('Invalid email or password');
    }

    // Attach the locataire object to the request for use in subsequent middleware functions/controllers
    req.locataire = locataire;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed to authenticate locataire'
    });
  }
};

module.exports = {
    saveLocataire,
};
