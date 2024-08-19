import { patchActivity, postActivity } from '@/apis/myPage/myActivitySettings';
import { ActivityFormData, PatchActivityFormData } from '@/apis/myPage/myActivitySettings.types';
import { useMutation } from '@tanstack/react-query';

export const useActivityMutation = (activityId: string | string[] | undefined, onSuccess: () => void) => {
  return useMutation<unknown, Error, ActivityFormData | PatchActivityFormData>({
    mutationFn: (formData) =>
      activityId
        ? patchActivity(activityId, formData as PatchActivityFormData)
        : postActivity(formData as ActivityFormData),
    onSuccess,
    onError: (error) => {
      console.error(error);
    },
  });
};
