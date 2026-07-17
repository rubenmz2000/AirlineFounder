import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.DEV
        ? 'http://localhost:5056'
        : 'https://api.airlinefounder.rmzsoftwares.com',
});

export default apiClient;