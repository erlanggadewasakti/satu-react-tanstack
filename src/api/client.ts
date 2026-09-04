import { QueryClient } from '@tanstack/react-query';
import axiosServices, { fetcher } from 'utils/axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

export { axiosServices, fetcher };
export default axiosServices;
