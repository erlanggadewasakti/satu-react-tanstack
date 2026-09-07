import { ENDPOINTS } from 'api/endpoints';
import { CreateMockItemPayload, MockItem, MockPaginatedData, MockPaginationParams } from 'types/api/mock';
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
        ...(params.search ? { search: params.search } : {}),
        ...(params.sortBy ? { sort_by: params.sortBy, sortBy: params.sortBy } : {}),
        ...(params.sortDir ? { sort_dir: params.sortDir, sortDir: params.sortDir } : {})
      }
    });
    return response.data?.data || response.data;
  },

  createMockData: async (payload: CreateMockItemPayload): Promise<MockItem> => {
    const response = await axiosServices.post(ENDPOINTS.MOCK.CREATE, payload);
    return response.data?.data || response.data;
  },

  updateMockData: async (id: string | number, payload: CreateMockItemPayload): Promise<MockItem> => {
    const response = await axiosServices.put(ENDPOINTS.MOCK.UPDATE(id), payload);
    return response.data?.data || response.data;
  },

  deleteMockData: async (id: string | number): Promise<void> => {
    const response = await axiosServices.delete(ENDPOINTS.MOCK.DELETE(id));
    return response.data;
  }
};

