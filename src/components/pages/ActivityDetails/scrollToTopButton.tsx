import { AnimatePresence, animate, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IoIosArrowRoundUp } from 'react-icons/io';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    animate(window.scrollY, 0, {
      duration: 0.3, // 초 단위, 낮출수록 더 빠른 속도로 최상단으로 이동
      onUpdate: (value) => window.scrollTo(0, value),
      ease: 'easeInOut',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="flex h-35 w-35 cursor-pointer items-center justify-center rounded-full bg-gray-500 px-8 pb-8 pt-12 text-xl-medium text-white shadow-lg md:h-50 md:w-50 md:text-2xl-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IoIosArrowRoundUp size={28} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
