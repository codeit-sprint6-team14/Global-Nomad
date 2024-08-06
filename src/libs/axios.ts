import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

type AxiosRequesterParams<T> = {
  options: AxiosRequestConfig<T>;
  includeAuth?: boolean;
};

type AxiosRequester = <T>(params: AxiosRequesterParams<T>) => Promise<AxiosResponse<T>>;

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
