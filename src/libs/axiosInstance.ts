import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}

// 리프레시 토큰을 사용하여 새 토큰을 받아오는 함수
export const newToken = async (refreshToken: string): Promise<TokensResponse> => {
  const response = await axios.post<TokensResponse>(`${API_BASE_URL}/auth/tokens`, { refreshToken });
  return response.data;
};

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // 리프레시 토큰이 없으면 로그아웃 처리
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/signin';
          return Promise.reject(error);
        }
        const tokens = await newToken(refreshToken);
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료되었다면 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
