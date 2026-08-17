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

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface MockPaginatedData {
  current_page: number;
  data: MockItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface MockPaginationApiResponse {
  code: number;
  data: MockPaginatedData;
}

export interface MockPaginationParams {
  page?: number;
  per_page?: number;
  search?: string;
}
