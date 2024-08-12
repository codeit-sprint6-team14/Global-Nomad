const Rectangle = ({ width = '', height = '', fill = 'none', className = '' }) => (
  <div className={className}>
    <svg width={width} height={height} viewBox="0 0 167 167" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="166" height="166" rx="11.5" stroke="#4B4B4B" strokeDasharray="4 4" />
    </svg>
  </div>
);

export default Rectangle;
