import apiClient from '../api/apiClient';
import type { AircraftModel } from '../types/market';

export const getAvailableModels = async (): Promise<AircraftModel[]> => {
    const response = await apiClient.get<AircraftModel[]>('/api/Market');
    return response.data;
};