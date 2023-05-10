const express = require('express');
const agentmunicipaliteController = require('../Controllers/agentmunicipaliteController');

const  saveAgent  = require('../Middlewares/agentmAuth')

const { createAgent, getAgentById, updateAgentById, deleteAgentById,updateAgentByEmail , getAgents , changerMotDePasse } = agentmunicipaliteController;

const router = express.Router();


router.post('/createAgent', saveAgent, createAgent);
router.post('/changement-mot-de-passe/:email',changerMotDePasse);

router.get('/getAgents', getAgents);

router.get('/getAgentById/:id', getAgentById);

router.put('/updateAgentById/:id', updateAgentById);
router.post('/UpdateNewAgentByEmail/:email', updateAgentByEmail);
router.delete('/deleteAgentById/:id', deleteAgentById);

module.exports = router;
