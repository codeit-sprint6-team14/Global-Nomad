import { axiosRequester } from '@/libs/axios';

type UpdateProfileParams = {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
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
      includeAuth: true, // 만약 인증이 필요하다면 includeAuth를 true로 설정
    });

    return data;
  } catch (error) {
    console.error('프로필 업데이트 실패:', error);
    throw error;
  }
};
