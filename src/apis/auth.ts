import ErrorMessages from '@/constants/errorMessages';
import { axiosRequester } from '@/libs/axios';
import { SigninData, SigninResult, SignupData } from '@/types/auth';
import { isAxiosError } from 'axios';

export const postUserSignup = async (userData: SignupData) => {
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
          return { success: false, message: ErrorMessages.EMAIL_ALREADY_REGISTERED };
        case 400:
          return { success: false, message: ErrorMessages.INVALID_EMAIL };
        default:
          return { success: false, message: ErrorMessages.SIGNUP_ERROR };
      }
    }
    return { success: false, message: ErrorMessages.UNKOWN_ERROR };
  }
};

export const postUserSignin = async (credentials: SigninData): Promise<SigninResult> => {
  try {
    const response = await axiosRequester({
      options: {
        method: 'POST',
        url: '/auth/login',
        data: credentials,
      },
    });
    return response.data as SigninResult;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      switch (error.response.status) {
        case 400:
          return { error: ErrorMessages.PASSWORD_CONFIRMATION_MISMATCH };
        case 404:
          return { error: ErrorMessages.USER_NOT_FOUND };
        default:
          return { error: ErrorMessages.SIGNIN_ERROR };
      }
    }
    return { error: ErrorMessages.UNKOWN_ERROR };
  }
};
