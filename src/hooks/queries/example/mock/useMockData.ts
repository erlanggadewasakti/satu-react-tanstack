import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ENDPOINTS } from 'api/endpoints';
import { mockService } from 'api/services/example/mock/mockService';
import { CreateMockItemPayload, MockPaginationParams, UpdateMockItemPayload } from 'types/api/mock';

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

/**
 * Mutation hook to create new mock data
 */
export const useCreateMockData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMockItemPayload) => mockService.createMockData(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.MOCK.GET_ALL] });
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.MOCK.PAGINATION] });
    }
  });
};

/**
 * Mutation hook to update existing mock data by ID
 */
export const useUpdateMockData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }: UpdateMockItemPayload) => mockService.updateMockData(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.MOCK.GET_ALL] });
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.MOCK.PAGINATION] });
    }
  });
};

/**
 * Mutation hook to delete mock data by ID
 */
export const useDeleteMockData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => mockService.deleteMockData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.MOCK.GET_ALL] });
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.MOCK.PAGINATION] });
    }
  });
};
