import apiClient from '../api/apiClient';
import type { Dashboard } from '../types/dashboard';

export const getDashboard = async (): Promise<Dashboard | null> => {
    try {
        const response = await apiClient.get<Dashboard>('/api/Dashboard');
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 404) return null;
        throw error;
    }
};