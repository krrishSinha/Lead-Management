import * as z from "zod";
import Lead from "../models/Lead.js";

const leadShcema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.email(),
    phone: z.string().regex(/^\d{7,15}$/),
    message: z.string().max(500).optional(),
    company: z.string().min(1, 'Company Name is required'),
    job_title: z.string().min(1, 'Job Title is required'),
    source: z.enum(['website', 'ad', 'referral', 'social media', 'other']).optional()
});

const updateLeadStatusSchema = z.object({
    status: z.enum(['new', 'contacted', 'converted', 'lost'])
});


// CREATE LEAD CONTROLLER 
export const createLead = async (req, res) => {
    try {

        const parsedData = leadShcema.parse(req.body);

        const lead = await Lead.create(parsedData)

        res.status(201).json({
            success: true,
            lead
        })

    } catch (error) {
        console.error(error)
        res.status(400).json({ success: false, message: 'Invalid data' })
    }
};


// GET LEADS CONTROLLER 
export const getLeads = async (req, res) => {
    try {

        const { status, source, search, sort = '-createdAt' } = req.query;

        const filter = {};

        if (status && status !== "all") {
            filter.status = status;
        }

        if (source && source !== "all") {
            filter.source = source;
        }

        if (search) {
            filter.$or = [
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } },
                { job_title: { $regex: search, $options: "i" } },
            ];
        }

        const leads = await Lead.find(filter).sort(sort).lean();

        res.status(200).json({
            success: true,
            data: leads
        })

    } catch (error) {
        console.error(error)
        res.status(400).json({ success: false, message: error })
    }
}


// GET LEAD BY ID CONTROLLER 
export const getLeadById = async (req, res) => {
    try {

        const { id } = req.params

        const lead = await Lead.findById(id)

        res.status(200).json({
            success: true,
            data: lead
        })

    } catch (error) {
        console.error(error)
        res.status(400).json({ success: false, message: error })
    }
};


// UPDATE LEAD CONTROLLER
export const updateLeadStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const parsed = updateLeadStatusSchema.parse(req.body)

        const updated = await Lead.findByIdAndUpdate(id,
            { status: parsed.status },
            { new: true }
        )

        res.status(200).json({
            success: true,
            data: updated
        })


    } catch (error) {
        console.error(error)
        res.status(400).json({ success: false, message: error })
    }
};

// UPDATE LEAD DETAILS CONTROLLER
export const updateLeadDetails = async (req, res) => {
    try {

        const { id } = req.params;
        const parsed = leadShcema.parse(req.body)

        const updated = await Lead.findByIdAndUpdate(id,
            parsed,
            { new: true }
        )

        res.status(200).json({
            success: true,
            data: updated
        })


    } catch (error) {
        console.error(error)
        res.status(400).json({ success: false, message: error })
    }
}



// DELETE LEAD CONTROLLER 
export const deleteLead = async (req, res) => {
    try {

        const { id } = req.params

        await Lead.findByIdAndDelete(id)

        res.status(200).json({ success: true })

    } catch (error) {
        console.error(error)
        res.status(400).json({ success: false, message: error })
    }
}

