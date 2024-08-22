import { removeToastAtom } from '@/store/toastsAtom';
import { useSetAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdError } from 'react-icons/md';

export type ToastType = 'success' | 'error';

export interface ToastProps {
  type?: ToastType;
  message?: string;
  id: string;
}

const getToastIcon = (type?: ToastType) => {
  switch (type) {
    case 'success':
      return <IoCheckmarkCircle />;
    case 'error':
      return <MdError />;
    default:
      return null;
  }
};

const TOAST_DURATION = 3000;
const ANIMATION_DURATION = 300;

const Toast: React.FC<ToastProps> = ({ type, message = '테스트 메세지입니다.', id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const removeToastItem = useSetAtom(removeToastAtom);

  useEffect(() => {
    const showTimeout = setTimeout(() => setIsVisible(true), 100);
    const hideTimeout = setTimeout(() => setIsVisible(false), TOAST_DURATION);
    const removeTimeout = setTimeout(() => removeToastItem(id), TOAST_DURATION + ANIMATION_DURATION);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      clearTimeout(removeTimeout);
    };
  }, [id, removeToastItem]);

  return (
    <div
      className={`fixed bottom-24 right-24 inline-flex w-300 items-center rounded-lg px-24 py-16 transition-all duration-300 ease-in-out ${
        type === 'success' ? 'bg-green-200' : 'bg-red-500'
      } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
    >
      <div className="mr-10 text-white">{getToastIcon(type)}</div>
      <div className="inline-flex h-full w-full items-center justify-center text-sm font-semibold text-white">
        {message}
      </div>
    </div>
  );
};

export default Toast;
