import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  timestamp?: string;
  path?: string;
}

class ApiService {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private handleAxiosError(error: AxiosError): never {
    if (error.response) {
      const data = error.response.data as ApiError;
      throw {
        message: data?.message || error.message,
        status: error.response.status,
        errors: data?.errors,
        timestamp: data?.timestamp,
        path: data?.path,
      };
    }
    throw {
      message: error.message,
      status: 0,
    };
  }

  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(`${API_BASE_URL}${endpoint}`, {
        headers: this.getAuthHeaders(),
        ...config,
      });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
    }
  }

  async post<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
        headers: this.getAuthHeaders(),
        ...config,
      });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
    }
  }

  async put<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.put(`${API_BASE_URL}${endpoint}`, data, {
        headers: this.getAuthHeaders(),
        ...config,
      });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
    }
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.delete(`${API_BASE_URL}${endpoint}`, {
        headers: this.getAuthHeaders(),
        ...config,
      });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
    }
  }

  async upload<T>(endpoint: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> {
    const token = localStorage.getItem('authToken');
    try {
      const response: AxiosResponse<T> = await axios.post(`${API_BASE_URL}${endpoint}`, formData, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          // 'Content-Type' will be set automatically by Axios for FormData
        },
        ...config,
      });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
    }
  }
}

export const apiService = new ApiService();
export default apiService;  