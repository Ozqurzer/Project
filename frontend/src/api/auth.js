import axios from 'axios';

const BASE_URL = 'http://localhost:5555/api';

export const registerUser = async (userData) => axios.post(`${BASE_URL}/register`, userData);


/*export const loginUser = async (user) => axios.post(`${BASE_URL}/login`, user, {
        withCredentials: true // hinzufügen credentials: 'include'
     });*/
export const loginUser = async (user) => {
    return axios.post(`${BASE_URL}/login`, user, {
        withCredentials: true // hinzufügen credentials: 'include'
    });
};
//export const verifyTokenRequest = async () => axios.get(`${BASE_URL}/verify`);

export const verifyTokenRequest = async () => {
    return axios.get(`${BASE_URL}/verify`, {
        withCredentials: true // hinzufügen credentials: 'include'
    });
};