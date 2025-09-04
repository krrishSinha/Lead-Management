const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    source: { type: String, enum: ['website', 'ad', 'referral', 'social media', 'other'], default: 'website' },
    status: { type: String, enum: ['new', 'contacted', 'converted', 'lost'], default: 'new' },
    message: { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.models.Lead || mongoose.model('Lead', leadSchema)