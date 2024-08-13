type CirclePointProps = {
  color?: string;
};

const CirclePoint: React.FC<CirclePointProps> = ({ color = 'fill-blue-400' }) => (
  <svg width="5" height="5" viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg" className={color}>
    <circle cx="2.5" cy="2.5" r="2.5" />
  </svg>
);

export default CirclePoint;
