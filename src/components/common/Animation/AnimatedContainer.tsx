import { MotionProps, motion } from 'framer-motion';

interface AnimatedContainerProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ children, className, ...motionProps }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
        opacity: { duration: 0.5 },
        x: { duration: 0.5, delay: 0.1 },
      }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
