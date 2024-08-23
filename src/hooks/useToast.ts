import { toastAtom } from '@/store/toastsAtom';
import { useSetAtom } from 'jotai';

const useToast = () => {
  const addToast = useSetAtom(toastAtom);

  return {
    success: addToast('success'),
    error: addToast('error'),
  };
};

export default useToast;
