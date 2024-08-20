/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
  const client = await axiosInstance({ ...options });
  return client;
};
