import { postImageToUrl } from '@/apis/myPage/myActivitySettings';
import { useMutation } from '@tanstack/react-query';

interface UploadImageResult {
  activityImageUrl: string;
}

export const useUploadBannerImageMutation = (onSuccess: (data: UploadImageResult) => void) => {
  return useMutation({
    mutationFn: postImageToUrl,
    onSuccess,
    onError: (error) => {
      console.error('Image upload error:', error);
    },
  });
};
