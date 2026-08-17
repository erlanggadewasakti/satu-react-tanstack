import { ENDPOINTS } from 'api/endpoints';
import { MockItem, MockPaginatedData, MockPaginationParams } from 'types/api/mock';
import axiosServices from 'utils/axios';

/**
 * Mock API Service Layer
 * Pure functions consuming axiosServices and returning unwrapped data.
 */
export const mockService = {
  getMockData: async (): Promise<MockItem[]> => {
    const response = await axiosServices.get(ENDPOINTS.MOCK.GET_ALL);
    return response.data?.data || response.data || [];
  },

  getPaginatedMockData: async (params: MockPaginationParams = {}): Promise<MockPaginatedData> => {
    const response = await axiosServices.get(ENDPOINTS.MOCK.PAGINATION, {
      params: {
        page: params.page || 1,
        per_page: params.per_page || 10,
        ...(params.search ? { search: params.search } : {})
      }
    });
    return response.data?.data || response.data;
  }
};
