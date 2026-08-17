/**
 * Generic API Response Types
 */
export interface ApiResponse<T> {
  status: number;
  message?: string;
  data: T;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}
