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
    return <pre className="whitespace-pre-wrap break-words font-sans text-16 leading-relaxed">{text}</pre>;
  };

  const truncatedDescription = description.slice(0, maxLength);
  const remainingDescription = description.slice(maxLength);

  return (
    <div className="mb-32 md:mb-40">
      <h2 className="mb-16 text-20 font-bold md:text-24">체험 설명</h2>
      {renderDescription(truncatedDescription)}
      {!isExpanded && description.length > maxLength && '...'}
      <AnimatePresence>
        {isExpanded && description.length > maxLength && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.3 }}
          >
            {renderDescription(remainingDescription)}
          </motion.div>
        )}
      </AnimatePresence>
      {description.length > maxLength && (
        <button onClick={toggleExpand} className="mt-8 text-16 text-blue-500 hover:underline">
          {isExpanded ? '접기' : '더보기'}
        </button>
      )}
    </div>
  );
};

export default Description;
