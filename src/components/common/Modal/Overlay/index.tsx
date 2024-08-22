import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalOverlayProps {
  isOpen: boolean | string | null;
  onClose: () => void;
  children: ReactNode;
}

const ModalOverlay = ({ isOpen, onClose, children }: ModalOverlayProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const scrollbarWidth = getScrollbarWidth();

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen, onClose]);

  if (!isBrowser || !isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
    >
      {children}
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default ModalOverlay;
