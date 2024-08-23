import { ToastProps, ToastType } from '@/components/common/Toast';
import { atom } from 'jotai';

export const toastsAtom = atom<ToastProps[]>([]);

export const toastAtom = atom(null, (get, set, type: ToastType) => (message: string) => {
  const prevAtom = get(toastsAtom);
  const newToast = {
    type,
    message,
    id: Date.now().toString(),
  };

  set(toastsAtom, [...prevAtom, newToast]);
});

export const removeToastAtom = atom(null, (get, set, id: string) => {
  const prevAtom = get(toastsAtom);
  set(
    toastsAtom,
    prevAtom.filter((toast) => toast.id !== id),
  );
});
