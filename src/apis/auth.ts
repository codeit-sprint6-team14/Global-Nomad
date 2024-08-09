import { axiosRequester } from '@/libs/axios';
import { SignupData } from '@/types/auth';
import { isAxiosError } from 'axios';

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
