import apiClient from '../api/apiClient';
import type { FleetItem } from '../types/fleet';

export const getFleet = async (): Promise<FleetItem[] | null> => {
    try {
        const response = await apiClient.get<FleetItem[]>('/api/Fleet');
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 404) return null;
        throw error;
    }
};

export const purchaseAircraft = async (modelId: number): Promise<void> => {
    await apiClient.post('/api/Fleet/purchase', { modelId });
};