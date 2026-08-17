import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from 'api/endpoints';
import { mockService } from 'api/services/mockService';
import { MockPaginationParams } from 'types/api/mock';

/**
 * Fetch all mock data (client-side)
 */
export const useGetMockData = () =>
  useQuery({
    queryKey: [ENDPOINTS.MOCK.GET_ALL],
    queryFn: mockService.getMockData
  });

/**
 * Fetch paginated mock data (server-side)
 */
export const useGetPaginatedMockData = (params: MockPaginationParams) =>
  useQuery({
    queryKey: [ENDPOINTS.MOCK.PAGINATION, params],
    queryFn: () => mockService.getPaginatedMockData(params),
    placeholderData: keepPreviousData
  });
