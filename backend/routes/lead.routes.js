const express = require('express')
const { createLead, getLeads, updateLeadStatus, deleteLead } = require('../controllers/lead.controller.js')
const router = express.Router()

// create lead
router.post('/', createLead);

// get leads 
router.get('/', getLeads);

// update lead status 
router.put('/:id', updateLeadStatus);

// delete lead
router.delete('/:id', deleteLead);

module.exports = router