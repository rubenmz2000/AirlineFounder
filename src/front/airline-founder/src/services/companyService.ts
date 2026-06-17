import apiClient from '../api/apiClient';
import type { Company, CreateCompanyRequest } from '../types/company.ts';

export const getCurrentCompany = async (): Promise<Company | null> => {
    try {
        const response = await apiClient.get<Company>('/Company');
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 404) return null;
        throw error;
    }
};

export const createCompany = async (data: CreateCompanyRequest): Promise<Company> => {
    const response = await apiClient.post<Company>('/Company', data);
    return response.data;
};

export const updateCompany = async (data: CreateCompanyRequest): Promise<Company> => {
    const response = await apiClient.put<Company>('/Company', data);
    return response.data;
};