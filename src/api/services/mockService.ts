import { ENDPOINTS } from 'api/endpoints';
import { MockItem } from 'types/api/mock';
import axiosServices from 'utils/axios';

/**
 * Mock API Service Layer
 * Pure functions consuming axiosServices and returning unwrapped data.
 */
export const mockService = {
  getMockData: async (): Promise<MockItem[]> => {
    const response = await axiosServices.get(ENDPOINTS.MOCK.GET_ALL);
    console.log('🚀🚀 response: ', response);
    return response.data?.data || response.data || [];
  }
};
