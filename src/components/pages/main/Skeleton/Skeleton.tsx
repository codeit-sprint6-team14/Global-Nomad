const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`}></div>
);

export default Skeleton;
