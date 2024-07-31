const DropDownOption = ({
  key,
  handleOptionClick,
  label,
}: {
  key: string;
  handleOptionClick: (label: string) => void;
  label: string;
}) => {
  return (
    <li
      key={key}
      onClick={() => handleOptionClick(label)}
      className="w-full cursor-pointer border-b border-gray-300 px-16 py-12 text-center text-md-medium text-gray-800 hover:bg-green-100"
    >
      {label}
    </li>
  );
};

export default DropDownOption;
