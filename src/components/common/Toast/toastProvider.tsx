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
    <div className="fixed bottom-24 right-24 z-50 flex flex-col items-end gap-2">
      {toasts?.map((toast) => <Toast key={toast.id} {...toast} />)}
    </div>,
    document.body,
  );
};

export default ToastProvider;
