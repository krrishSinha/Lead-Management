import axios from 'axios';


const API = axios.create({
    baseURL: 'http://localhost:3000/api/v1'
});


export const createLead = (data) => {
    return API.post('/leads/', data)
        .then((result) => result)
};


export const getLeads = (params) => {
    return API.get('/leads', { params }).then((result) => result.data)
};


