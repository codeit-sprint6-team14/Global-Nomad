import { axiosRequester } from '@/libs/axios';
import { LoginResult, SigninData, SignupData, TokensResponse } from '@/types/auth';
import axios, { isAxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const signUp = async (userData: SignupData) => {
  try {
    const response = await axiosRequester({
      options: {
        method: 'POST',
        url: `/users`,
        data: userData,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      switch (error.response.status) {
        case 409:
          return { success: false, message: '중복된 이메일입니다.' };
        case 400:
          return { success: false, message: '이메일 형식으로 작성해주세요.' };
        default:
          return { success: false, message: '회원가입 중 오류가 발생했습니다.' };
      }
    }
    return { success: false, message: '알 수 없는 오류가 발생했습니다.' };
  }
};

export const signIn = async (credentials: SigninData): Promise<LoginResult> => {
  try {
    const response = await axios.post<TokensResponse>(`${API_BASE_URL}/auth/login`, credentials);
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      switch (error.response.status) {
        case 400:
          return { success: false, error: '이메일 또는 비밀번호 형식이 올바르지 않습니다.' };
        case 401:
          return { success: false, error: '이메일 또는 비밀번호가 일치하지 않습니다.' };
        case 404:
          return { success: false, error: '존재하지 않는 사용자입니다.' };
        default:
          return { success: false, error: '로그인 중 오류가 발생했습니다.' };
      }
    }
    return { success: false, error: '알 수 없는 오류가 발생했습니다.' };
  }
};
