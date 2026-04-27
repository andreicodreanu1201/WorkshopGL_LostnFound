import axiosInstance from './axiosInstance';

// ============================================
// Define your API response types here
// ============================================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ============================================
// API Endpoints - Organized by Resource
// ============================================

// Auth Endpoints
export const authApi = {
  login: async (email: string, password: string) => {
    return axiosInstance.post('/auth/login', { email, password });
  },
  logout: async () => {
    return axiosInstance.post('/auth/logout');
  },
  register: async (email: string, password: string, name: string) => {
    return axiosInstance.post('/auth/register', { email, password, name });
  },
  getProfile: async () => {
    return axiosInstance.get('/auth/profile');
  },
};

// Users Endpoints
export const usersApi = {
  getAll: async () => {
    return axiosInstance.get('/users');
  },
  getById: async (id: string) => {
    return axiosInstance.get(`/users/${id}`);
  },
  update: async (id: string, data: any) => {
    return axiosInstance.put(`/users/${id}`, data);
  },
  delete: async (id: string) => {
    return axiosInstance.delete(`/users/${id}`);
  },
};

// Add more endpoint groups as needed
// export const productsApi = { ... };
// export const ordersApi = { ... };

export default {
  auth: authApi,
  users: usersApi,
};
