import axios from 'axios';


const API = axios.create({
    baseURL: 'http://localhost:3000/api/v1'
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

// update lead status 
export const updateLeadStatus = async (id, status) => {
    return API.put(`/leads/${id}`, { status }).then((result) => result.data)
};

// delete lead 
export const deleteLead = async (id,) => {
    return API.delete(`/leads/${id}`).then((result) => result.data)
};



