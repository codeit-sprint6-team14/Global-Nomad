const DropDownOption = ({
  key,
  handleOptionClick,
  label,
  className,
}: {
  key?: string | number;
  handleOptionClick: (label: string) => void;
  label: string;
  className: string;
}) => {
  return (
    <li
      key={key}
      onClick={() => handleOptionClick(label)}
      className={`w-full cursor-pointer border-b border-gray-300 px-16 py-12 text-center text-md-medium text-gray-800 last:border-b-0 hover:bg-green-100 ${className}`}
    >
      {label}
    </li>
  );
};

export default DropDownOption;
