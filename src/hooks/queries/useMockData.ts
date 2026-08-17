import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from 'api/endpoints';
import { mockService } from 'api/services/mockService';

/**
 * Fetch all mock data
 */
export const useGetMockData = () =>
  useQuery({
    queryKey: [ENDPOINTS.MOCK.GET_ALL],
    queryFn: mockService.getMockData
  });
