/**
 * Mock Data Module Interfaces
 */
export interface MockItem {
  id: number;
  name: string;
  job: string;
  address: string;
  birth_date: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

export interface MockApiResponse {
  code: number;
  data: MockItem[];
}
