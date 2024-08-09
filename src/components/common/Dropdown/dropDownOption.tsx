const DropDownOption = ({
  handleOptionClick,
  label,
  className,
}: {
  handleOptionClick: (label: string) => void;
  label: string;
  className?: string;
}) => {
  return (
    <li
      onClick={() => handleOptionClick(label)}
      className={`w-full cursor-pointer border-b border-gray-300 px-16 py-12 text-center text-md-medium text-gray-800 last:border-b-0 hover:bg-green-100 ${className}`}
    >
      {label}
    </li>
  );
};

export default DropDownOption;
