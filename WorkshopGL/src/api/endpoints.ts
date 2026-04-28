import axiosInstance from './axiosInstance';

// ============================================
// Global Base URL Configuration
// ============================================
export const API_BASE_URL = 'http://localhost:8080';

// ============================================
// Define your API response types here
// ============================================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthTokenResponse {
  token: string;
}

// ============================================
// API Endpoints - Organized by Resource
// ============================================

// Auth Endpoints
export const authApi = {
  login: async (email: string, password: string): Promise<AuthTokenResponse> => {
    return axiosInstance.post('/auth/login', { email, password });
  },
  logout: async () => {
    return axiosInstance.post('/auth/logout');
  },
  register: async (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    address: string,
    phone: string
  ): Promise<AuthTokenResponse> => {
    return axiosInstance.post('/auth/register', {
      email, password, firstname, lastname, address, phone
    });
  },
  getProfile: async () => {
    return axiosInstance.get('/auth/profile');
  },
};

// Users Endpoints
export const usersApi = {
  getAll: async () => axiosInstance.get('/users'),
  getById: async (id: string) => axiosInstance.get(`/users/${id}`),
  update: async (id: string, data: unknown) => axiosInstance.put(`/users/${id}`, data),
  delete: async (id: string) => axiosInstance.delete(`/users/${id}`),
};

// Add more endpoint groups as needed
// export const productsApi = { ... };
// export const ordersApi = { ... };

export default {
  auth: authApi,
  users: usersApi,
};