import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://airlinefounderapi.rmzsoftwares.com/api',
});

export default apiClient;