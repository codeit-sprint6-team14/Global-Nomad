interface DeleteButtonProps {
  width?: string;
  height?: string;
}

const DeleteButton = ({ width = '24', height = '24' }: DeleteButtonProps) => {
  return (
    <div>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_12785_3027)">
          <circle cx="12" cy="12" r="12" fill="#1B1B1B" fillOpacity="0.8" />
          <path d="M7.2002 7.19971L16.8002 16.7997" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7.2002 16.7998L16.8002 7.19s981" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </g>
        <defs>
          <clipPath id="clip0_12785_3027">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default DeleteButton;
