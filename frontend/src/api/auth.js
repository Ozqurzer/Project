import axios from 'axios';

const BASE_URL = 'http://localhost:5555/api';

export const registerUser = async (userData) => axios.post(`${BASE_URL}/register`, userData);


export const loginUser = async (user) => axios.post(`${BASE_URL}/login`, user);

export const verifyTokenRequest = async () => axios.get(`${BASE_URL}/verify`);
