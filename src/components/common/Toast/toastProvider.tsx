import Toast from '@/components/common/Toast';
import { toastsAtom } from '@/store/toastsAtom';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const ToastProvider = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const toasts = useAtomValue(toastsAtom);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="absolute left-1/2 top-5 flex -translate-x-1/2 flex-col items-center gap-5">
      {toasts?.map((toast) => <Toast key={toast.id} {...toast} />)}
    </div>,
    document.getElementById('toast-root') as HTMLElement,
  );
};

export default ToastProvider;
