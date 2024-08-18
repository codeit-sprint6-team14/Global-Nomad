import { axiosRequester } from '@/libs/axios';

type UserProfile = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

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
