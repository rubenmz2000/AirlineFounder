import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5056/api',
});

export default apiClient;