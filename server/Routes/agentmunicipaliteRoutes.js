const express = require('express');
const agentmunicipaliteController = require('../Controllers/agentmunicipaliteController');

const  saveAgent  = require('../Middlewares/agentmAuth')

const { createAgent, getAgentById, updateAgentById, deleteAgentById,updateAgentByEmail , getAgents , changerMotDePasse } = agentmunicipaliteController;

const router = express.Router();


router.post('/agents', saveAgent, createAgent);
router.post('/agents/changement-mot-de-passe/:email',changerMotDePasse);

router.get('/agents', getAgents);

router.get('/agents/:id', getAgentById);

router.put('/agents/:id', updateAgentById);
router.post('/agents/UpdateNewAgentByEmail/:email', updateAgentByEmail);
router.delete('/agents/:id', deleteAgentById);

module.exports = router;
