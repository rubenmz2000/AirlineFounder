import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://localhost:5056/api',
});

export default apiClient;