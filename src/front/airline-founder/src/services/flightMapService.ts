import apiClient from '../api/apiClient.ts'
import type AircraftPosition from '../types/aircraftPosition.ts'

export const getAircraftPosition =  async (): Promise<Company | null> => {
    const response = await apiClient.get<AircraftPosition>("/api/Aircraft");
    return response.data;
}