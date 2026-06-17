import apiClient from '../api/apiClient';

export const addMoney = async (amount: number): Promise<void> => {
    await apiClient.post('/Developer/add-money', { amount });
};

export const subtractMoney = async (amount: number): Promise<void> => {
    await apiClient.post('/Developer/subtract-money', { amount });
};

export const addFreeAircraft = async (modelId: number): Promise<void> => {
    await apiClient.post('/Developer/add-free-aircraft', { modelId });
};

export const resetDatabase = async (): Promise<void> => {
    await apiClient.post('/Developer/reset-database');
};