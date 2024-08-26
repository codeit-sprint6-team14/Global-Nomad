import { axiosRequester } from '@/libs/axios';
import { useQuery } from '@tanstack/react-query';

export interface MyInformation {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: null;
  createdAt: string;
  updatedAt: string;
}

export const getMyInformation = async () => {
  const { data } = await axiosRequester<MyInformation>({
    options: {
      method: 'GET',
      url: `/users/me`,
    },
    includeAuth: true,
  });

  return data;
};

export const useMyInformation = () => {
  const {
    data: userInformationData,
    isLoading,
    error,
  } = useQuery<MyInformation>({
    queryKey: ['userInformation'],
    queryFn: () => getMyInformation(),
    retry: false,
  });

  return { userInformationData, isLoading, error };
};
