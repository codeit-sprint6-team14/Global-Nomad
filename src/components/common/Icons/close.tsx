interface CloseProps {
  width?: number;
  height?: number;
  color?: string;
}

const Close = ({ width = 48, height = 48, color = '#4B4B4B', ...props }: CloseProps) => (
  <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M14 10L34 30" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M34 10L14 30" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export default Close;
