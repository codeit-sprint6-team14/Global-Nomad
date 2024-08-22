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
    <div className="fixed bottom-0 right-0 flex flex-col items-end gap-5 p-5">
      {toasts?.map((toast) => <Toast key={toast.id} {...toast} />)}
    </div>,
    document.getElementById('toast-root') as HTMLElement,
  );
};

export default ToastProvider;
