import { axiosRequester } from '@/libs/axios';
import { AxiosRequestConfig } from 'axios';

type UploadImageResponse = {
  profileImageUrl: string;
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
