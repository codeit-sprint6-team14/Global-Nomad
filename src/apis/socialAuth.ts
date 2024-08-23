import { axiosInstance } from '@/libs/axios';
import { SigninResponse } from '@/types/auth';

const SocialAuth = {
  // 간편 회원가입
  postSignup: async (provider: 'google' | 'kakao', body: { nickname: string; redirectUri: string; token: string }) => {
    const { data } = await axiosInstance.post<SigninResponse>(`/oauth/sign-up/${provider}`, body);
    const { accessToken, refreshToken } = data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return data;
  },
  postSignin: async (provider: 'google' | 'kakao', body: { redirectUri: string; token: string }) => {
    const { data } = await axiosInstance.post<SigninResponse>(`/oauth/sign-in/${provider}`, body);
    const { accessToken, refreshToken } = data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return data;
  },
};

export default SocialAuth;
