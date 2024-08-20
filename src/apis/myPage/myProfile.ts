import { axiosRequester } from '@/libs/axios';
import { AxiosRequestConfig } from 'axios';

import { UpdateProfileParams, UploadImageResponse, UserProfile } from './myProfile.types';

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await axiosRequester<UserProfile>({
      options: {
        method: 'GET',
        url: '/users/me',
      },
      includeAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};

export const updateProfile = async ({ nickname, profileImageUrl, newPassword }: UpdateProfileParams) => {
  try {
    const { data } = await axiosRequester({
      options: {
        method: 'PATCH',
        url: '/users/me',
        data: {
          ...(nickname && { nickname }),
          ...(profileImageUrl && { profileImageUrl }),
          ...(newPassword && { newPassword }),
        },
      },
      includeAuth: true,
    });

    return data;
  } catch (error) {
    console.error('프로필 업데이트 실패:', error);
    throw error;
  }
};

export const uploadImage = async (formData: FormData): Promise<string> => {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: '/users/me/image',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await axiosRequester<UploadImageResponse>({ options, includeAuth: true });
    console.log('Upload response:', response);
    return response.data.profileImageUrl;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw error;
  }
};
