import { axiosInstance } from '@/libs/axios';
import { SigninResponse } from '@/types/auth';
import Cookies from 'js-cookie';

const SocialAuth = {
  // 간편 회원가입
  postSignup: async (provider: 'google' | 'kakao', body: { nickname: string; redirectUri: string; token: string }) => {
    const { data } = await axiosInstance.post<SigninResponse>(`/oauth/sign-up/${provider}`, body);
    const { accessToken, refreshToken } = data;
    Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'strict' });
    Cookies.set('refreshToken', refreshToken, { expires: 1, secure: true, sameSite: 'strict' });
    return data;
  },
  postSignin: async (provider: 'google' | 'kakao', body: { redirectUri: string; token: string }) => {
    const { data } = await axiosInstance.post<SigninResponse>(`/oauth/sign-in/${provider}`, body);
    const { accessToken, refreshToken } = data;
    Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'strict' });
    Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
    localStorage.setItem('social', 'true');
    return data;
  },
};

export default SocialAuth;
