/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const currentRefreshToken = localStorage.getItem('refreshToken');
      try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/tokens`, null, {
          headers: {
            Authorization: `Bearer ${currentRefreshToken}`,
          },
        });
        const { accessToken, refreshToken } = data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

type AxiosRequesterParams<T, D = any> = {
  options: AxiosRequestConfig<D>;
  includeAuth?: boolean;
};

type AxiosRequester = <T, D = any>(params: AxiosRequesterParams<T, D>) => Promise<AxiosResponse<T>>;

export const axiosRequester: AxiosRequester = async ({ options, includeAuth = false }) => {
  if (includeAuth) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  }
  return axiosInstance(options);
};
