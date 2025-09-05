const express = require('express')
const { createLead, getLeads, updateLeadStatus, deleteLead, updateLeadDetails, getLeadById } = require('../controllers/lead.controller.js')
const router = express.Router()

// create lead
router.post('/', createLead);

// get leads 
router.get('/', getLeads);

// get lead by ID
router.get('/:id', getLeadById);

// update lead status 
router.put('/:id', updateLeadStatus);

// update lead details 
router.put('/edit/:id', updateLeadDetails);

// delete lead
router.delete('/:id', deleteLead);

module.exports = router