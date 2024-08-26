import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const Description = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100; // 최대 표시 글자 수

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const variants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1 },
  };

  const renderDescription = (text: string) => {
    const paragraphs = text.split('\n\n');
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-4 whitespace-pre-line text-lg-regular text-black-100 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="flex flex-col border-b border-solid border-gray-300 py-16 md:border-t md:py-40">
      <h1 className="text-xl-bold text-black-100">체험 설명</h1>
      <div className="mt-16">
        {renderDescription(isExpanded ? description : description.slice(0, maxLength))}
        {!isExpanded && description.length > maxLength && '...'}
      </div>
      <AnimatePresence initial={false}>
        {isExpanded && description.length > maxLength && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.2 }}
          >
            {renderDescription(description.slice(maxLength))}
          </motion.div>
        )}
      </AnimatePresence>
      {description.length > maxLength && (
        <button
          onClick={toggleExpand}
          className="mt-16 cursor-pointer self-start text-lg-bold text-blue-200 hover:text-blue-300"
        >
          {isExpanded ? <a href="#title">접기</a> : '더보기'}
        </button>
      )}
    </div>
  );
};

export default Description;
