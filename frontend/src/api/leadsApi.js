import axios from 'axios';


const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});


// create lead 
export const createLead = async (data) => {
    return API.post('/leads/', data)
        .then((result) => result)
};

// get leads 
export const getLeads = async (params) => {
    return API.get('/leads', { params }).then((result) => result.data)
};

// get lead by ID
export const getLeadById = async (id) => {
    return API.get(`/leads/${id}`).then((result) => result.data)
};

// update lead status 
export const updateLeadStatus = async (id, status) => {
    return API.put(`/leads/${id}`, { status }).then((result) => result.data)
};

// update lead details 
export const updateLeadDetails = async (id, data) => {
    return API.put(`/leads/edit/${id}`, data).then((result) => result.data)
};

// delete lead 
export const deleteLead = async (id,) => {
    return API.delete(`/leads/${id}`).then((result) => result.data)
};



