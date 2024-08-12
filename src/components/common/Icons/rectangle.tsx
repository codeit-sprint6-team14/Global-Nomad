const Rectangle = ({ width = '', height = '', fill = 'none', className = '', error = false }) => (
  <div className={className}>
    <svg
      width={width}
      height={height}
      viewBox="0 0 167 167"
      fill={error ? 'rgba(255, 0, 0, 0.1)' : fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="166"
        height="166"
        rx="11.5"
        stroke={error ? '#FF0000' : '#4B4B4B'}
        strokeDasharray="4 4"
      />
    </svg>
  </div>
);

export default Rectangle;
