const mongoose = require('mongoose')

function formatString(value) {
    if (!value) return value;
    return value.trim().charAt(0).toUpperCase() + value.trim().slice(1).toLowerCase();
}

const leadSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true, set: formatString },
    lastName: { type: String, required: true, trim: true, set: formatString },
    email: { type: String, required: true, trim: true, set: formatString },
    phone: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true, set: formatString },
    job_title: { type: String, required: true, trim: true, set: formatString },
    source: { type: String, enum: ['website', 'ad', 'referral', 'social media', 'other'], default: 'website' },
    status: { type: String, enum: ['new', 'contacted', 'converted', 'lost'], default: 'new' },
    message: { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.models.Lead || mongoose.model('Lead', leadSchema)