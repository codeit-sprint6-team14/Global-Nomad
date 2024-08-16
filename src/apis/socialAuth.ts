import { axiosInstance } from '@/libs/axios';

export type User = {
  id: string;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type OauthPostRes = {
  id: number;
  provider: string;
  teamId: string;
  appKey: string;
  createdAt: string;
  updatedAt: string;
};

export type OauthSignRes = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

const SocialAuth = {
  // 간편 회원가입
  postSignup: async (provider: 'google' | 'kakao', body: { nickname: string; redirectUri: string; token: string }) => {
    const { data } = await axiosInstance.post<OauthSignRes>(`/oauth/sign-up/${provider}`, body);
    const { accessToken, refreshToken } = data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return data;
  },
  postSignin: async (provider: 'google' | 'kakao', body: { redirectUri: string; token: string }) => {
    const { data } = await axiosInstance.post<OauthSignRes>(`/oauth/sign-in/${provider}`, body);
    const { accessToken, refreshToken } = data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return data;
  },
};

export default SocialAuth;
