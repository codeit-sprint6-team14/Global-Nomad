import { postImageToUrl } from '@/apis/myPage/myActivitySettings';
import { useMutation } from '@tanstack/react-query';

export const useUploadIntroImageMutation = (onSuccess: (data: { activityImageUrl: string }[]) => void) => {
  return useMutation({
    mutationFn: (files: File[]) => Promise.all(files.map(postImageToUrl)),
    onSuccess,
    onError: (error) => {
      console.error(error);
    },
  });
};
