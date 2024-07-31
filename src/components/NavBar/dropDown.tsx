const DropDown = () => {
  return (
    <ul className="absolute right-[-12px] top-40 h-max w-120 rounded-6 border border-solid border-gray-300 bg-white">
      <li className="w-full cursor-pointer border-b border-gray-300 px-16 py-12 text-center text-md-medium text-gray-800 hover:bg-green-100">
        로그아웃
      </li>
      <li className="w-full cursor-pointer px-16 py-12 text-center text-md-medium text-gray-800 hover:bg-green-100">
        마이페이지
      </li>
    </ul>
  );
};

export default DropDown;
