/**
 * Centralized API Endpoint Registry
 * Maps readable module keys to actual backend URL paths.
 */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: 'auth/login',
    ME: 'auth/me'
  },
  MOCK: {
    GET_ALL: 'https://stg-service-satu.telkomuniversity.ac.id/framework-console/api/mockapi/all',
    PAGINATION: 'https://stg-service-satu.telkomuniversity.ac.id/framework-console/api/mockapi/pagination'
  }
} as const;
